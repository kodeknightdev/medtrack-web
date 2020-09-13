import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomListComponent } from './symptom-list/symptom-list.component';

const routes: Routes = [
  { path: '', component: SymptomListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymptomsRoutingModule { }
