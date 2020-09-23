import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  {
    path: 'symptoms',
    canActivate: [AuthGuard],
    loadChildren: () => import('./symptoms/symptoms.module').then(m => m.SymptomsModule)
  },
  {
    path: 'medications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./medications/medications.module').then(m => m.MedicationsModule)
  },
  {
    path: 'appointments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'timeline',
    canActivate: [AuthGuard],
    loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
  },
  { path: '**', redirectTo: 'timeline' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
