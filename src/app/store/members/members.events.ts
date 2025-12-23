import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Member, MemberData } from './member';

export const membersEvents = eventGroup({
	source: 'Members',
	events: {
		search: type<{term: string, page: number, pageSize: number}>(),
		createMember: type<MemberData>(),
		updateMember: type<Member>(),
		setMembers: type<Member[]>(),
		memberProcessed: type<Member>(),
	},
});
