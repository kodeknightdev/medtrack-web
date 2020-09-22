export type TimelineItemType = 'symptom' | 'appointment' | 'medication';

export interface TimelineItem {
  type: TimelineItemType;
  id: number;
  date: string;
  title: string;
  detail?: string;
}
