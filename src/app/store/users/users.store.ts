import { inject } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { catchError, of, switchMap, tap } from 'rxjs';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { User } from './user';
import { UserApi } from '../../services/user-api';
import { usersEvents } from './users.events';
import { initialState } from './users.state';

export const UsersStore = signalStore(
	withState(initialState),
	withEntities<User>(),
	withReducer(
		on(usersEvents.loadUsers, (event, state) => ({ ...state, loading: true })),
	),

	withEventHandlers((store, events = inject(Events), userApi = inject(UserApi)) => ({
		loginAttempt$: events.on(usersEvents.loadUsers).pipe(
			switchMap((x) =>
				userApi.fetchAllUsers().pipe(
					catchError(() => of([])),
					tap((users) => {
						patchState(store, addEntities(users));
						patchState(store, { loading: false });
					})
				)
			)
		),
	}))
);
