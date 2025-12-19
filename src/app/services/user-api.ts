import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../store/users/user';

@Injectable()
export class UserApi {
	private readonly http = inject(HttpClient);

	fetchAllUsers() {
		return this.http.get<User[]>(`/api/users`);
	}
}
