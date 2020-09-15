import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MedicationsRoutingModule } from './medications-routing.module';
import { MedicationListComponent } from './medication-list/medication-list.component';
import { MedicationFormComponent } from './medication-form/medication-form.component';

@NgModule({
  declarations: [
    MedicationListComponent,
    MedicationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedicationsRoutingModule
  ]
})
export class MedicationsModule { }
