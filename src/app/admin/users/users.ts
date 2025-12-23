import { Component, effect, inject, OnInit } from '@angular/core';
import { UsersStore } from '../../store/users/users.store';
import { injectDispatch } from '@ngrx/signals/events';
import { usersEvents } from '../../store/users/users.events';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../store/users/user';
import { UserRolePipe } from './user-role-pipe';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'gen-users',
	imports: [NgxSkeletonLoaderModule, MatTableModule, UserRolePipe, MatCardModule],
	templateUrl: './users.html',
	styleUrl: './users.scss',
})
export class Users implements OnInit {
	private readonly userStore = inject(UsersStore);
	private readonly dispatch = injectDispatch(usersEvents);

	protected loading = this.userStore.loading;
	displayedColumns: string[] = ['userName', 'roles', 'active', 'actions'];
	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

	constructor() {
		effect(() => {
			const users = this.userStore.entities();
			this.dataSource.data = users;
		});
	}
	ngOnInit(): void {
		if (this.userStore.ids().length === 0) {
			this.dispatch.loadUsers();
		}
	}
}
