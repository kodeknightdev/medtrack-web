import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MedicationsRoutingModule } from './medications-routing.module';
import { MedicationListComponent } from './medication-list/medication-list.component';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { DueRemindersComponent } from './due-reminders/due-reminders.component';

@NgModule({
  declarations: [
    MedicationListComponent,
    MedicationFormComponent,
    DueRemindersComponent
  ],
  imports: [
    SharedModule,
    MedicationsRoutingModule
  ]
})
export class MedicationsModule { }
