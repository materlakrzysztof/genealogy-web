import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged-guard';
import { UsersStore } from './store/users/users.store';
import { UserApi } from './services/user-api';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./welcome-page/welcome-page').then((m) => m.WelcomePage),
	},
	{
		path: 'login',
		loadComponent: () => import('./login-page/login-page').then((m) => m.LoginPage),
	},
	{
		path: 'search',
		canActivate: [loggedGuard],
		loadComponent: () =>
			import('./members/members-list/members-list').then((m) => m.MembersList),
	},
	{
		path: 'view',
		canActivate: [loggedGuard],
		loadComponent: () =>
			import('./members/members-three/members-three').then((m) => m.MembersThree),
	},
	{
		path: 'member/:id',
		loadComponent: () =>
			import('./members/members-details/members-details').then((m) => m.MembersDetails),
	},
	{
		path: 'admin/users',
		providers: [UsersStore, UserApi],
		loadComponent: () => import('./admin/users/users').then((m) => m.Users),
	},
	{
		path: 'account',
		loadComponent: () => import('./admin/account/account').then((m) => m.Account),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
