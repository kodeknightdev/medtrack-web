export interface Symptom {
  id: number;
  name: string;
  severity: number;
  notes?: string;
  occurredAt: string;
  createdAt: string;
}

export type SaveSymptom = Pick<Symptom, 'name' | 'severity' | 'notes' | 'occurredAt'>;
