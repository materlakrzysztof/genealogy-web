import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { ActionType, initialState } from './members.state';
import { Member, MemberData, MemberSimple } from './member';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { membersEvents } from './members.events';
import { MembersApi } from '../../services/members-api';
import { mapResponse } from '@ngrx/operators';

export const MembersStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withEntities<MemberSimple>(),

	withReducer(
		on(membersEvents.addNew, (event, state) => ({ ...state, actionType: 'edit' as ActionType })),
		on(membersEvents.editMember, (event, state) => ({
			...state,
			actionType: 'edit' as ActionType,
			memberId: event.payload.memberId,
		})),
		on(membersEvents.search, (event, state) => ({ ...state, loading: true })),
		on(membersEvents.removeMemberSuccess, (event, state) => ({
			...state,
			...removeEntity(event.payload.memberId),
		}))
	),

	withMethods((store, membersApi = inject(MembersApi)) => ({
		resetActionType(): void {
			patchState(store, { actionType: null });
		},
		createMember(data: MemberData): void {
			patchState(store, { processingMember: true });
			membersApi
				.createMember(data)
				.pipe(
					catchError(() => {
						return EMPTY;
					})
				)
				.subscribe((member) => {
					if (member) {
						patchState(store, addEntity(member as MemberSimple));
					}
					patchState(store, { processingMember: false });
				});
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
	}))
);
