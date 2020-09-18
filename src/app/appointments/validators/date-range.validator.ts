import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Group-level validator: sets `dateRange` on the group when `endKey` is not after `startKey`.
 */
export function dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get(startKey)?.value;
    const end = group.get(endKey)?.value;
    if (!start || !end) {
      return null;
    }
    return new Date(end) > new Date(start) ? null : { dateRange: true };
  };
}
