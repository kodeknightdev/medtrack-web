import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  readonly user$: Observable<string | null>;
  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }

  logout(): void {
    this.auth.logout();
  }
}
