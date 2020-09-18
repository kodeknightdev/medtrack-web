import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppointmentService } from '../../core/services/appointment.service';
import { fromLocalInput, toLocalInput } from '../../core/utils/date-utils';
import { dateRangeValidator } from '../validators/date-range.validator';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    provider: ['', Validators.maxLength(100)],
    location: ['', Validators.maxLength(200)],
    startsAt: ['', Validators.required],
    endsAt: ['', Validators.required],
    notes: ['', Validators.maxLength(1000)]
  }, { validators: dateRangeValidator('startsAt', 'endsAt') });
  editingId: number | null = null;
  saving = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = +id;
      this.appointmentService.get(this.editingId).subscribe(a => {
        this.form.patchValue({
          ...a,
          startsAt: toLocalInput(a.startsAt),
          endsAt: toLocalInput(a.endsAt)
        });
      });
    }
  }

  /** Default the end time to an hour after the start when it's empty. */
  onStartChange(): void {
    const start = this.form.value.startsAt;
    if (start && !this.form.value.endsAt) {
      const end = new Date(start);
      end.setHours(end.getHours() + 1);
      this.form.patchValue({ endsAt: toLocalInput(end) });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const payload = {
      ...value,
      startsAt: fromLocalInput(value.startsAt),
      endsAt: fromLocalInput(value.endsAt)
    };

    this.saving = true;
    this.error = '';
    const request: Observable<unknown> = this.editingId
      ? this.appointmentService.update(this.editingId, payload)
      : this.appointmentService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/appointments']),
      error: () => {
        this.saving = false;
        this.error = 'Could not save the appointment.';
      }
    });
  }

  delete(): void {
    if (!this.editingId || !confirm('Delete this appointment?')) {
      return;
    }
    this.appointmentService.delete(this.editingId)
      .subscribe(() => this.router.navigate(['/appointments']));
  }
}
