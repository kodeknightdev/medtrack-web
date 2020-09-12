export interface Medication {
  id: number;
  name: string;
  dosage?: string;
  instructions?: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  /** HH:mm, local time */
  reminderTime?: string;
  lastTakenAt?: string;
}

export type SaveMedication = Omit<Medication, 'id' | 'lastTakenAt'>;
