import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Medication } from '../../core/models/medication';
import { MedicationService } from '../../core/services/medication.service';

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];
  loading = false;

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.medicationService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(meds => this.medications = meds);
  }

  delete(med: Medication): void {
    if (!confirm(`Remove ${med.name}?`)) {
      return;
    }
    this.medicationService.delete(med.id).subscribe(() => {
      this.medications = this.medications.filter(m => m.id !== med.id);
    });
  }
}
