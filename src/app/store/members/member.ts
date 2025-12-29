import { Gender } from './gender';


export interface MemberSimpleData {
	firstName: string;
	lastName: string;
	birthDate: string | null;
	maidenName: string | null;
	deathDate: string | null;
}

export interface MemberSimple extends MemberSimpleData {
	id: number;
}

export interface MemberData extends MemberSimpleData {
	birthPlace: string | null;
	deathPlace: string | null;
	gender: Gender;
	notes: string | null;
}

export interface Member extends MemberData {
	id: number;
}
