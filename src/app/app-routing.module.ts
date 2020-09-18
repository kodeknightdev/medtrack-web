import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'symptoms', pathMatch: 'full' },
  {
    path: 'symptoms',
    loadChildren: () => import('./symptoms/symptoms.module').then(m => m.SymptomsModule)
  },
  {
    path: 'medications',
    loadChildren: () => import('./medications/medications.module').then(m => m.MedicationsModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  { path: '**', redirectTo: 'symptoms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
