import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { TimelineItem, TimelineItemType } from '../core/models/timeline-item';
import { TimelineService } from '../core/services/timeline.service';
import { toDateKey } from '../core/utils/date-utils';

interface TimelineDay {
  day: Date;
  items: TimelineItem[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  days: TimelineDay[] = [];
  loading = false;

  private readonly links: Record<TimelineItemType, string> = {
    symptom: '/symptoms',
    appointment: '/appointments',
    medication: '/medications'
  };

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.loading = true;
    this.timelineService.get()
      .pipe(finalize(() => this.loading = false))
      .subscribe(items => this.days = this.groupByDay(items));
  }

  linkFor(item: TimelineItem): (string | number)[] {
    return [this.links[item.type], item.id, 'edit'];
  }

  private groupByDay(items: TimelineItem[]): TimelineDay[] {
    const days: TimelineDay[] = [];
    let lastKey = '';
    for (const item of items) {
      const date = new Date(item.date);
      const key = toDateKey(date);
      if (key !== lastKey) {
        days.push({ day: date, items: [] });
        lastKey = key;
      }
      days[days.length - 1].items.push(item);
    }
    return days;
  }
}
