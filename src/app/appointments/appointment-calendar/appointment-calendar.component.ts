import { Component, OnInit } from '@angular/core';

import { Appointment } from '../../core/models/appointment';
import { AppointmentService } from '../../core/services/appointment.service';
import { toDateKey } from '../../core/utils/date-utils';

interface CalendarDay {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  readonly weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  current = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  weeks: CalendarDay[][] = [];
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.list().subscribe(list => {
      this.appointments = list;
      this.build();
    });
    this.build();
  }

  previousMonth(): void {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() - 1, 1);
    this.build();
  }

  nextMonth(): void {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 1);
    this.build();
  }

  today(): void {
    const now = new Date();
    this.current = new Date(now.getFullYear(), now.getMonth(), 1);
    this.build();
  }

  private build(): void {
    const byDay = new Map<string, Appointment[]>();
    for (const a of this.appointments) {
      const key = toDateKey(new Date(a.startsAt));
      byDay.set(key, [...(byDay.get(key) || []), a]);
    }

    const first = this.current;
    const offset = first.getDay();
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
    const todayKey = toDateKey(new Date());

    this.weeks = [];
    for (let w = 0; w < 6; w++) {
      const week: CalendarDay[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d);
        const key = toDateKey(date);
        week.push({
          date,
          inMonth: date.getMonth() === first.getMonth(),
          isToday: key === todayKey,
          appointments: byDay.get(key) || []
        });
      }
      this.weeks.push(week);
    }
  }
}
