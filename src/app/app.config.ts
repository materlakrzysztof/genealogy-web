import { ApplicationConfig, makeStateKey, PLATFORM_ID, provideBrowserGlobalErrorListeners, TransferState } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { baseUrlInterceptor } from './services/base-url-interceptor';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { API_URL } from './services/api-url.token';
import { DATE_PIPE_DEFAULT_OPTIONS, isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
		provideTranslateService({
			lang: 'en',
			fallbackLang: 'en',
			loader: provideTranslateHttpLoader({
				prefix: '/i18n/',
				suffix: '.json',
			}),
		}),
		CookieService,
		provideNgxSkeletonLoader({
			theme: {
				extendsFromRoot: true,
				height: '30px',
			},
		}),
		{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
		provideLuxonDateAdapter(),
		{
			provide: MAT_LUXON_DATE_ADAPTER_OPTIONS,
			useValue: {
				useUtc: true,
				firstDayOfWeek: 1, // opcjonalnie: poniedziałek
			},
		},
		{ provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'shortDate' } },
		{
			provide: API_URL,
			useFactory:	(state: TransferState, platformId: Object) => {
				const key = makeStateKey<string>('API_URL');
				if(isPlatformBrowser(platformId)) {
					const apiUrlFromState = state.get<string>(key, ''); 
					return apiUrlFromState;
				} else {
					const apiUrlFromEnv = process.env['API_URL'] || '';
					state.set<string>(key, apiUrlFromEnv);
					return apiUrlFromEnv;
				}
			},
			deps: [TransferState, PLATFORM_ID],
		},
		// {
		// 	provide: API_URL,
		// 	useValue: 'https://genealogy-api-10q9.onrender.com',
		// },
	],
};
