import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface AuthResponse {
  token: string;
  email: string;
  expiresAt: string;
}

const TOKEN_KEY = 'medtrack.token';
const EMAIL_KEY = 'medtrack.email';
const EXPIRES_KEY = 'medtrack.expires';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = `${environment.apiUrl}/auth`;
  private readonly userSubject = new BehaviorSubject<string | null>(this.isLoggedIn() ? localStorage.getItem(EMAIL_KEY) : null);

  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, { email, password })
      .pipe(tap(res => this.store(res)));
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/register`, { email, password })
      .pipe(tap(res => this.store(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const expires = localStorage.getItem(EXPIRES_KEY);
    return !!localStorage.getItem(TOKEN_KEY) && !!expires && new Date(expires) > new Date();
  }

  private store(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(EMAIL_KEY, res.email);
    localStorage.setItem(EXPIRES_KEY, res.expiresAt);
    this.userSubject.next(res.email);
  }
}
