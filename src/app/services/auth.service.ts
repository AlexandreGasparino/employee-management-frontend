import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUser(response.employee);
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private setUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem(this.USER_KEY);
      return json ? JSON.parse(json) : null;
    }
    return null;
  }
}