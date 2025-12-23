import { Gender } from './gender';

export interface MemberData {
	firstName: string;
	lastName: string;
	birthDate: string | null; // ISO date string
	maidenName: string | null;
	birthPlace: string | null;
	deathDate: string | null; // ISO date string
	deathPlace: string | null;
	gender: Gender;
	notes: string | null;
}

export interface Member extends MemberData{
	id: number;
}
