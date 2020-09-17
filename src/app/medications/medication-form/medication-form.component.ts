import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MedicationService } from '../../core/services/medication.service';
import { toDateInput } from '../../core/utils/date-utils';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.scss']
})
export class MedicationFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    dosage: ['', Validators.maxLength(50)],
    instructions: ['', Validators.maxLength(500)],
    startDate: [toDateInput(new Date()), Validators.required],
    endDate: [''],
    active: [true],
    reminderTime: ['']
  });
  editingId: number | null = null;
  saving = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicationService: MedicationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = +id;
      this.medicationService.get(this.editingId).subscribe(m => {
        this.form.patchValue({
          ...m,
          startDate: toDateInput(m.startDate),
          endDate: m.endDate ? toDateInput(m.endDate) : '',
          reminderTime: m.reminderTime || ''
        });
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    // some browsers include seconds (HH:mm:ss) when the input has a step, the api wants HH:mm
    const reminderTime = value.reminderTime ? value.reminderTime.substring(0, 5) : null;
    const payload = {
      ...value,
      endDate: value.endDate || null,
      reminderTime
    };

    this.saving = true;
    this.error = '';
    const request: Observable<unknown> = this.editingId
      ? this.medicationService.update(this.editingId, payload)
      : this.medicationService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/medications']),
      error: () => {
        this.saving = false;
        this.error = 'Could not save. Please check the form and try again.';
      }
    });
  }
}
