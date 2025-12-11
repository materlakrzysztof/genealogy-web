import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	private readonly http = inject(HttpClient);

	login(username: string, password: string) {
		return this.http.post<{ token: string }>(`/api/login`, { username, password });
	}
}
