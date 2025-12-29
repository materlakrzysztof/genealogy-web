import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_URL } from './services/api-url.token';

const serverConfig: ApplicationConfig = {
	providers: [
		provideServerRendering(withRoutes(serverRoutes)),

		{
			provide: API_URL,
			useValue:  process.env['API_URL'],
		},
	],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
