import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { baseUrlInterceptor } from './services/base-url-interceptor';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

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
	],
};
