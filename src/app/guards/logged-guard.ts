import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = (route, state) => {
	const authStore = inject(AuthStore);
	const router = inject(Router);
	if (!authStore.loggedIn()) {
		router.navigate(['/login']);
		return false;
	}
	return true;
};
