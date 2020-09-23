import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@NgModule({
  declarations: [
    AppointmentCalendarComponent,
    AppointmentFormComponent
  ],
  imports: [
    SharedModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
