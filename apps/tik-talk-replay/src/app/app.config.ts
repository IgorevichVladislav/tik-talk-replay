import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptorFn } from '@tt/auth-service';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //Запускает роутинг
    provideHttpClient(withInterceptors([authTokenInterceptorFn])),
    //Добавляем интерсепторы
    provideStore(),
    //Добавляем сторы, чтобы он заработал
    provideEffects(),
    //Добавляем Effects
  ],
};
