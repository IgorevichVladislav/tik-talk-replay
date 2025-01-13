import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'
  cookieService = inject(CookieService)
  http = inject(HttpClient);
  router = inject(Router);
  token: string | null = ''
  refresh_token: string | null = ''

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refresh_token = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData();

    fd.append("username", payload.username);
    fd.append("password", payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`,
      fd)
      .pipe(
        tap(val => {
          this.saveTokens(val)
        })
      )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}refresh`, {
      refresh_token: this.refresh_token,
    }).pipe(
      tap(res => {
        this.saveTokens(res)
      }),

      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = this.refresh_token = null
    this.router.navigate(['login'])
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token
    this.refresh_token = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refresh_token)
  }

}
