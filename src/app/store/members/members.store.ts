import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { catchError, EMPTY, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { ActionType, initialState } from './members.state';
import { Member, MemberData, MemberSimple } from './member';
import {
	addEntity,
	removeEntity,
	setAllEntities,
	updateEntity,
	withEntities,
} from '@ngrx/signals/entities';
import { membersEvents } from './members.events';
import { MembersApi } from '../../services/members-api';
import { mapResponse } from '@ngrx/operators';

export const MembersStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withEntities<MemberSimple>(),

	withReducer(
		on(membersEvents.addNew, (event, state) => ({
			...state,
			actionType: 'edit' as ActionType,
			memberId: null,
			member: null,
		})),
		on(membersEvents.editMember, (event, state) => ({
			...state,
			actionType: 'edit' as ActionType,
		})),
		on(membersEvents.search, (event, state) => ({ ...state, loading: true })),
		on(membersEvents.setMember, (event, state) => ({
			...state,
			memberId: event.payload.member ? event.payload.member.id : null,
			member: event.payload.member,
		})),
		on(membersEvents.removeMemberSuccess, (event, state) => ({
			...state,
			...removeEntity(event.payload.memberId),
		}))
	),

	withMethods((store, membersApi = inject(MembersApi)) => ({
		resetActionType(): void {
			patchState(store, { actionType: null });
		},
		saveMember(data: MemberData): Observable<Member> {
			patchState(store, { processingMember: true });

			const memberId = store.memberId();

			const action = memberId
				? membersApi.updateMember({ id: memberId, ...data })
				: membersApi.createMember(data);

			return action
				.pipe(
					catchError(() => {
						return EMPTY;
					})
				)
				.pipe(tap((member) => {
					if (member) {
						if (memberId) {
							patchState(
								store,
								updateEntity({
									id: member.id,
									changes: member as MemberSimple,
								})
							);
						} else {
							patchState(store, addEntity(member as MemberSimple));
						}
					}
					patchState(store, { processingMember: false });
				}));
		},
	})),

	withEventHandlers((store, events = inject(Events), membersApi = inject(MembersApi)) => ({
		searchMembers$: events.on(membersEvents.search).pipe(
			switchMap((x) =>
				membersApi.fetchMembers(x.payload.term).pipe(
					catchError(() => of([])),
					tap((members) => {
						patchState(store, setAllEntities(members));
						patchState(store, { loading: false });
					})
				)
			)
		),
		removeMember$: events.on(membersEvents.removeMember).pipe(
			switchMap((x) =>
				membersApi.removeMember(x.payload.memberId).pipe(
					mapResponse({
						next: (response) => {
							return membersEvents.removeMemberSuccess({
								memberId: x.payload.memberId,
							});
						},
						error: (error: { status?: number }) => {
							return membersEvents.removeMemberFailure();
						},
					})
				)
			)
		),

		getMember$: events.on(membersEvents.editMember).pipe(
			filter((x) => x.payload.memberId !== store.memberId()),
			switchMap((x) =>
				membersApi.getMember(x.payload.memberId).pipe(
					mapResponse({
						next: (member) => {
							return membersEvents.setMember({ member });
						},
						error: () => {
							return membersEvents.setMember({ member: null });
						},
					})
				)
			)
		),
	}))
);
