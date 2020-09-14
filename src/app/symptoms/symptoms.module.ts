import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SymptomsRoutingModule } from './symptoms-routing.module';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { SymptomFormComponent } from './symptom-form/symptom-form.component';

@NgModule({
  declarations: [
    SymptomListComponent,
    SymptomFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SymptomsRoutingModule
  ]
})
export class SymptomsModule { }
