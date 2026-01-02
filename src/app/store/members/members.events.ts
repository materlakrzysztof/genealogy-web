import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Member, MemberData } from './member';

export const membersEvents = eventGroup({
	source: 'Members',
	events: {
		search: type<{ term: string; page: number; pageSize: number }>(),
		addNew: type<void>(),
		viewDetails: type<{ memberId: number }>(),
		editMember: type<{ memberId: number }>(),
		createMember: type<MemberData>(),
		setMember: type<{ member: Member | null }>(),
		memberProcessed: type<Member>(),
		removeMember: type<{ memberId: number }>(),
		removeMemberSuccess: type<{ memberId: number }>(),
		removeMemberFailure: type<void>(),
	},
});
