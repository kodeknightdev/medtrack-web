import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('stores the token after login', () => {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    service.login('a@b.com', 'secret123').subscribe();

    const req = http.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'abc', email: 'a@b.com', expiresAt });

    expect(service.token).toBe('abc');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('is not logged in when the token has expired', () => {
    localStorage.setItem('medtrack.token', 'abc');
    localStorage.setItem('medtrack.expires', new Date(Date.now() - 1000).toISOString());

    expect(service.isLoggedIn()).toBeFalse();
  });

  it('clears storage and navigates to login on logout', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    localStorage.setItem('medtrack.token', 'abc');

    service.logout();

    expect(service.token).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
