import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Shows the first validation message for a control once it's been touched.
 * Replaces the copy-pasted *ngIf blocks in every form.
 */
@Component({
  selector: 'app-field-error',
  template: `<div class="field-error" *ngIf="message">{{ message }}</div>`
})
export class FieldErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() label = 'This field';

  get message(): string {
    const c = this.control;
    if (!c || !c.errors || !(c.touched || c.dirty)) {
      return '';
    }
    const e = c.errors;
    if (e.required) {
      return `${this.label} is required.`;
    }
    if (e.email) {
      return 'Enter a valid email address.';
    }
    if (e.minlength) {
      return `${this.label} needs at least ${e.minlength.requiredLength} characters.`;
    }
    if (e.maxlength) {
      return `${this.label} must be at most ${e.maxlength.requiredLength} characters.`;
    }
    if (e.min || e.max) {
      return `${this.label} is out of range.`;
    }
    return `${this.label} is invalid.`;
  }
}
