import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';


let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return refreshAndProceed(authService, req, next);
      }
      return throwError(err);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken()
      .pipe(
      switchMap((token) => {
        return next(addToken(req, token.access_token))
          .pipe(
            tap(() => isRefreshing$.next(false)
            )
          )
      })
    );
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.token!));

  //return next(addToken(req, authService.token!))

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap(() => {
      return next(addToken(req, authService.token!));
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    //Клонируем реквест и изменяем его
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
