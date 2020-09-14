import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SymptomService } from '../../core/services/symptom.service';
import { fromLocalInput, toLocalInput } from '../../core/utils/date-utils';

@Component({
  selector: 'app-symptom-form',
  templateUrl: './symptom-form.component.html',
  styleUrls: ['./symptom-form.component.scss']
})
export class SymptomFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    severity: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    occurredAt: [toLocalInput(new Date()), Validators.required],
    notes: ['', Validators.maxLength(1000)]
  });
  saving = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private symptomService: SymptomService
  ) { }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const payload = { ...value, occurredAt: fromLocalInput(value.occurredAt) };
    this.saving = true;
    this.error = '';

    this.symptomService.create(payload).subscribe({
      next: () => this.router.navigate(['/symptoms']),
      error: () => {
        this.saving = false;
        this.error = 'Could not save. Please try again.';
      }
    });
  }
}
