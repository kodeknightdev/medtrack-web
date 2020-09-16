import { Component, OnInit } from '@angular/core';

import { Medication } from '../../core/models/medication';
import { MedicationService } from '../../core/services/medication.service';

@Component({
  selector: 'app-due-reminders',
  templateUrl: './due-reminders.component.html',
  styleUrls: ['./due-reminders.component.scss']
})
export class DueRemindersComponent implements OnInit {
  due: Medication[] = [];

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.medicationService.due().subscribe(due => this.due = due);
  }

  markTaken(med: Medication): void {
    this.medicationService.markTaken(med.id).subscribe(() => {
      this.due = this.due.filter(m => m.id !== med.id);
    });
  }
}
