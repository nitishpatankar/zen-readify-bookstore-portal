// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(
//       withInterceptors([
//         loadingInterceptor,
//         errorInterceptor
//       ])
//     )
//   ]
// };

import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/interceptors/global-error.handler';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [

    // Router
    provideRouter(routes),

    // HttpClient + Interceptors
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor
      ])
    ),

    // Optional (recommended for Angular 20 performance)
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Global Error Handler
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }

  ]
};