import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { SymptomFormComponent } from './symptom-form/symptom-form.component';

const routes: Routes = [
  { path: '', component: SymptomListComponent },
  { path: 'new', component: SymptomFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymptomsRoutingModule { }
