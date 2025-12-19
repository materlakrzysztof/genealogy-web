import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const membersEvents = eventGroup({
	source: 'Members',
	events: {
	},
});
