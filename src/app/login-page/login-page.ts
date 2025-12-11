import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStore } from '../store/auth.store';
import { injectDispatch } from '@ngrx/signals/events';
import { authEvents } from '../store/auth.events';
import { Router } from '@angular/router';

@Component({
	selector: 'gen-login-page',
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatInputModule,
		TranslatePipe,
		MatIconModule,
	],
	templateUrl: './login-page.html',
	styleUrl: './login-page.scss',
})
export class LoginPage {
	protected readonly loginForm = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});
	errorMessage = signal({
		username: '',
		password: '',
	});
	hidePassword: WritableSignal<boolean> = signal(true);
	generalErrorMessage: WritableSignal<string> = signal('');

	private readonly translate = inject(TranslateService);
	private readonly authStore = inject(AuthStore);
	private readonly router = inject(Router);
	private readonly dispatch = injectDispatch(authEvents);

	constructor() {
		merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.updateErrorMessage());

		effect(() => {
			const loggedIn = this.authStore.loggedIn();
			if (loggedIn) {
				this.router.navigate(['/']);
			}
		});

		effect(() => {
			const errorType = this.authStore.errorType();
			if (errorType) {
				this.generalErrorMessage.set(
					errorType === 401
						? this.translate.instant('errors.invalidCredentials')
						: this.translate.instant('errors.serverError')
				);
			} else {
				this.generalErrorMessage.set('');
			}
		});
	}
	private updateErrorMessage() {
		const setErrorMessage = (field: 'username' | 'password') => {
			if (this.loginForm.controls[field].hasError('required')) {
				this.errorMessage.update((msg) => ({
					...msg,
					[field]: this.translate.instant('errors.required'),
				}));
			} else {
				this.errorMessage.update((msg) => ({ ...msg, [field]: '' }));
			}
		};

		setErrorMessage('username');
		setErrorMessage('password');
	}

	login(): void {
		if (this.loginForm.valid) {
			const { username, password } = this.loginForm.value;
			this.dispatch.login({ username: username!, password: password! });
		}
	}
}
