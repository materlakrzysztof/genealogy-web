export type MembersState = {
	loading: boolean;
	term: string;
	page: number;
	pageSize: number;
	processingMember: boolean;
	editedMemberId: number | null;
};


export const initialState: MembersState = {
	loading: false,
	term: '',
	page: 1,
	pageSize: 10,
	processingMember: false,
	editedMemberId: null,
};