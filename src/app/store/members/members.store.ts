import { computed, inject } from '@angular/core';
import {
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withState,
} from '@ngrx/signals';
import { Events, injectDispatch, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { initialState } from './members.state';
import { Member, MemberData } from './member';
import { addEntities, addEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { membersEvents } from './members.events';
import { MembersApi } from '../../services/members-api';
import { tapResponse } from '@ngrx/operators';

export const MembersStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withEntities<Member>(),

	withReducer(
		on(membersEvents.search, (state) => ({ ...state, loading: true })),
	),

	withMethods((store, membersApi = inject(MembersApi)) => ({
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
						patchState(store, addEntity(member));
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
	}))
);
