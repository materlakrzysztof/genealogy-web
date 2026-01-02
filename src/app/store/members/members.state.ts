import { Member } from "./member";

export type ActionType = 'view' | 'edit' | null;

export type MembersState = {
	loading: boolean;
	term: string;
	page: number;
	pageSize: number;
	processingMember: boolean;
	memberId: number | null;
	actionType: ActionType;
	member: Member | null;
};


export const initialState: MembersState = {
	loading: false,
	term: '',
	page: 1,
	pageSize: 10,
	processingMember: false,
	memberId: null,
	actionType: null,
	member: null
};