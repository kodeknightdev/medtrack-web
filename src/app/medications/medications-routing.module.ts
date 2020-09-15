import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationListComponent } from './medication-list/medication-list.component';
import { MedicationFormComponent } from './medication-form/medication-form.component';

const routes: Routes = [
  { path: '', component: MedicationListComponent },
  { path: 'new', component: MedicationFormComponent },
  { path: ':id/edit', component: MedicationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationsRoutingModule { }
