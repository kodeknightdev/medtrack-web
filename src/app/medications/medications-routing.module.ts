import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationListComponent } from './medication-list/medication-list.component';

const routes: Routes = [
  { path: '', component: MedicationListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationsRoutingModule { }
