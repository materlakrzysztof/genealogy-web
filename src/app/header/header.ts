import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AuthStore } from '../store/auth.store';
import { injectDispatch } from '@ngrx/signals/events';
import { authEvents } from '../store/auth.events';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'gen-header',
	imports: [
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
		MatListModule,
		MatMenuModule,
	],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})
export class Header {
	private readonly authStore = inject(AuthStore);
	private readonly dispatch = injectDispatch(authEvents);

	protected loggedIn = this.authStore.loggedIn;
	protected userName = this.authStore.userName;

	logout() {
		this.dispatch.logout();
	}
}
