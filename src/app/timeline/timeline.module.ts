import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TimelineComponent } from './timeline.component';

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: TimelineComponent }])
  ]
})
export class TimelineModule { }
