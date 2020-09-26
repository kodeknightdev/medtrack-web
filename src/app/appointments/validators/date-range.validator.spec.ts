import { FormControl, FormGroup } from '@angular/forms';

import { dateRangeValidator } from './date-range.validator';

describe('dateRangeValidator', () => {
  const build = (start: string, end: string) => new FormGroup({
    startsAt: new FormControl(start),
    endsAt: new FormControl(end)
  }, { validators: dateRangeValidator('startsAt', 'endsAt') });

  it('passes when end is after start', () => {
    expect(build('2020-08-03T10:00', '2020-08-03T10:30').errors).toBeNull();
  });

  it('fails when end equals start', () => {
    expect(build('2020-08-03T10:00', '2020-08-03T10:00').errors).toEqual({ dateRange: true });
  });

  it('fails when end is before start', () => {
    expect(build('2020-08-03T10:00', '2020-08-02T10:00').errors).toEqual({ dateRange: true });
  });

  it('ignores incomplete input', () => {
    expect(build('2020-08-03T10:00', '').errors).toBeNull();
  });
});
