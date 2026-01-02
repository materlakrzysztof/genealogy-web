import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged-guard';
import { UsersStore } from './store/users/users.store';
import { UserApi } from './services/user-api';
import { MembersApi } from './services/members-api';
import { MembersStore } from './store/members/members.store';

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
		path: 'members',
		canActivate: [loggedGuard],
		providers: [MembersStore, MembersApi],
		loadComponent: () => import('./members/members/members').then((m) => m.Members),
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./members/members-list/members-list').then((m) => m.MembersList),
			},
		],
	},
	{
		path: 'members/view-three',
		canActivate: [loggedGuard],
		providers: [MembersStore, MembersApi],
		loadComponent: () =>
			import('./members/members-three/members-three').then((m) => m.MembersThree),
	},
	{
		path: 'members/add',
		canActivate: [loggedGuard],
		providers: [MembersStore, MembersApi],
		loadComponent: () => import('./members/member-add/member-add').then((m) => m.MemberAdd),
	},
	{
		path: 'members/:id',
		canActivate: [loggedGuard],
		providers: [MembersStore, MembersApi],
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
