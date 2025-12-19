import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withHooks, withState } from '@ngrx/signals';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Events, injectDispatch, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
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


export const MembersStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
);
