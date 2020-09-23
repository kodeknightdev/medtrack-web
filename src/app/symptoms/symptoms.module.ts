import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SymptomsRoutingModule } from './symptoms-routing.module';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { SymptomFormComponent } from './symptom-form/symptom-form.component';

@NgModule({
  declarations: [
    SymptomListComponent,
    SymptomFormComponent
  ],
  imports: [
    SharedModule,
    SymptomsRoutingModule
  ]
})
export class SymptomsModule { }
