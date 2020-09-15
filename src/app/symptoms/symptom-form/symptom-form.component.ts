import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SymptomService } from '../../core/services/symptom.service';
import { fromLocalInput, toLocalInput } from '../../core/utils/date-utils';

@Component({
  selector: 'app-symptom-form',
  templateUrl: './symptom-form.component.html',
  styleUrls: ['./symptom-form.component.scss']
})
export class SymptomFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    severity: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    occurredAt: [toLocalInput(new Date()), Validators.required],
    notes: ['', Validators.maxLength(1000)]
  });
  saving = false;
  error = '';
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private symptomService: SymptomService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = +id;
      this.symptomService.get(this.editingId).subscribe(s => {
        this.form.patchValue({
          name: s.name,
          severity: s.severity,
          occurredAt: toLocalInput(s.occurredAt),
          notes: s.notes || ''
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
    const payload = { ...value, occurredAt: fromLocalInput(value.occurredAt) };
    this.saving = true;
    this.error = '';

    const request: Observable<unknown> = this.editingId
      ? this.symptomService.update(this.editingId, payload)
      : this.symptomService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/symptoms']),
      error: () => {
        this.saving = false;
        this.error = 'Could not save. Please try again.';
      }
    });
  }
}
