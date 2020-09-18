import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

const routes: Routes = [
  { path: '', component: AppointmentCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
