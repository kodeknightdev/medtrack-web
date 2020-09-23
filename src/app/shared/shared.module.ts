import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FieldErrorComponent } from './field-error/field-error.component';

@NgModule({
  declarations: [
    FieldErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FieldErrorComponent
  ]
})
export class SharedModule { }
