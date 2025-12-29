import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member, MemberData, MemberSimple } from '../store/members/member';
import { of } from 'rxjs';

@Injectable()
export class MembersApi {
	private readonly http = inject(HttpClient);

	fetchMembers(term: string = '') {
		const params = new HttpParams().set('term', term);
		return this.http.get<MemberSimple[]>(`/api/members`, { params });
	}

	createMember(member: MemberData) {
		return this.http.post<Member>(`/api/members`, member);
	}

	updateMember(member: Member) {
		return this.http.put<Member>(`/api/members/${member.id}`, member);
	}

	removeMember(memberId: number) {
		return this.http.delete<any>(`/api/members/${memberId}`);
	}
}
