import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const authEvents = eventGroup({
	source: 'Auth',
	events: {
		// 👇 Defining an event creator without a payload.
		login: type<{ username: string; password: string }>(),
		setToken: type<string>(),
		logout: type<void>(),
		loginError: type<number | null>(),
	},
});
