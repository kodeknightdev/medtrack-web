import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SymptomsRoutingModule } from './symptoms-routing.module';
import { SymptomListComponent } from './symptom-list/symptom-list.component';

@NgModule({
  declarations: [
    SymptomListComponent
  ],
  imports: [
    CommonModule,
    SymptomsRoutingModule
  ]
})
export class SymptomsModule { }
