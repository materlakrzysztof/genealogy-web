export interface User {
	id: number;
	userName: string;
	role: UserRole;
	active: boolean;
}

export enum UserRole {
	None = 0,
	User = 1 << 0, // 0001 = 1
	Admin = 1 << 1, // 0010 = 2
}
