import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from './api-url.token';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const apiUrl = inject(API_URL, { optional: true }) ?? 'http://localhost:5181';
	if (req.url.startsWith('/api')) {
		req = req.clone({ url: apiUrl + req.url });
		return next(req);
	}
	return next(req);
};
