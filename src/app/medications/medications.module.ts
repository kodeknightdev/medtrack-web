import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MedicationsRoutingModule } from './medications-routing.module';
import { MedicationListComponent } from './medication-list/medication-list.component';

@NgModule({
  declarations: [
    MedicationListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedicationsRoutingModule
  ]
})
export class MedicationsModule { }
