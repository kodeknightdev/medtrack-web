import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [
    AppointmentCalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
