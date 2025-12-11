import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withHooks, withState } from '@ngrx/signals';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Events, injectDispatch, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { Auth } from '../services/auth';
import { authEvents } from './auth.events';
import { switchMap, tap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';

type AuthState = {
	userName: string | null;
	token: string | null;
	roles: string[];
	errorType: number | null;
};

const initialState: AuthState = {
	userName: null,
	token: null,
	roles: [],
	errorType: null,
};

const cookieName = 'auth_token';

export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed((state) => ({
		loggedIn: computed(() => !!state.token()),
		isAdmin: computed(() => !!state.roles().includes('Admin')),
	})),
	withReducer(
		on(authEvents.loginError, (event, state) => state),
		on(authEvents.loginError, (event, state) => ({
			...state,
			errorType: event.payload,
		})),
		on(authEvents.logout, (event, state) => {
			return {
				...state,
				userName: null,
				token: null,
				roles: [],
				errorType: null,
			};
		}),
		on(authEvents.setToken, (event, state) => {
			const token = event.payload;
			try {
				const decoded = jwtDecode<{ username: string; roles: string[] }>(token);
				return {
					...state,
					userName: decoded.username,
					token,
					roles: decoded.roles,
					errorType: null,
				};
			} catch (error) {
				return state;
			}
		})
	),
	withEventHandlers(
		(
			store,
			events = inject(Events),
			authService = inject(Auth),
			cookie = inject(CookieService)
		) => ({
			loginAttempt$: events.on(authEvents.login).pipe(
				switchMap((x) =>
					authService.login(x.payload.username, x.payload.password).pipe(
						mapResponse({
							next: (response) => {
								const token = response.token;
								cookie.set(cookieName, token);
								return authEvents.setToken(token);
							},
							error: (error: { status?: number }) => {
								const status = error.status || null;
								return authEvents.loginError(status === 401 ? 401 : 500);
							},
						})
					)
				),
			),
			logout$: events.on(authEvents.logout).pipe(
				tap(() => {
					cookie.delete(cookieName);
				})
			),
		})
	),
	withHooks({
		onInit(
			store,
			cookie = inject(CookieService),
			dispatch = injectDispatch(authEvents)
		) {
			const token = cookie.get(cookieName);
			if (token) {
				dispatch.setToken(token);
			}
		},
	})
);
