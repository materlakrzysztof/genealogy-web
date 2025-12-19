import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from './user';

export const usersEvents = eventGroup({
	source: 'Users',
	events: {
		loadUsers: type<void>(),
		setUser: type<User[]>(),
	},
});
