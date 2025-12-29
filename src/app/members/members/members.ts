import { Component, effect, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MemberForm } from '../member-form/member-form';
import { MembersStore } from '../../store/members/members.store';

@Component({
	selector: 'gen-members',
	imports: [MatSidenavModule, RouterOutlet, MatButtonModule, MatIconModule, MemberForm],
	templateUrl: './members.html',
	styleUrl: './members.scss',
})
export class Members {
	private readonly store = inject(MembersStore);
	protected actionType = this.store.actionType;
	protected memberId = this.store.memberId;
	drawer = viewChild<MatDrawer>('drawer');

	constructor() {
		effect(() => {
			const actionType = this.actionType();
			if (actionType) {
				this.openDrawer();
			}
		});
	}

	openDrawer(): void {
		if (!this.drawer()?.opened) {
			this.drawer()?.open();
		}
	}
	closeDrawer(): void {
		this.store.resetActionType();
		this.drawer()?.close();
	}
}
