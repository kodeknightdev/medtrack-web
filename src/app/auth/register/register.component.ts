import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  busy = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy = true;
    this.error = '';
    const { email, password } = this.form.value;
    this.auth.register(email, password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err: HttpErrorResponse) => {
        this.busy = false;
        this.error = err.status === 409
          ? 'An account with that email already exists.'
          : 'Could not create the account.';
      }
    });
  }
}
