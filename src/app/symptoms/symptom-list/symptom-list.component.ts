import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Symptom } from '../../core/models/symptom';
import { SymptomService } from '../../core/services/symptom.service';

@Component({
  selector: 'app-symptom-list',
  templateUrl: './symptom-list.component.html',
  styleUrls: ['./symptom-list.component.scss']
})
export class SymptomListComponent implements OnInit {
  symptoms: Symptom[] = [];
  loading = false;

  constructor(private symptomService: SymptomService) { }

  ngOnInit(): void {
    this.loading = true;
    this.symptomService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(symptoms => this.symptoms = symptoms);
  }

  delete(symptom: Symptom): void {
    if (!confirm(`Delete "${symptom.name}"?`)) {
      return;
    }
    this.symptomService.delete(symptom.id).subscribe(() => {
      this.symptoms = this.symptoms.filter(s => s.id !== symptom.id);
    });
  }
}
