import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from './api-url.token';
import { AuthStore } from '../store/auth.store';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const apiUrl = inject(API_URL, { optional: true }) ?? 'http://localhost:5181';
	const store = inject(AuthStore);
	if (req.url.startsWith('/api')) {
		const token = store.token();
		req = req.clone({ url: apiUrl + req.url, headers: req.headers.set('Authorization', `Bearer ${token}`) });
		return next(req);
	}
	return next(req);
};
