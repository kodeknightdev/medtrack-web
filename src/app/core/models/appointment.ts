export interface Appointment {
  id: number;
  title: string;
  provider?: string;
  location?: string;
  startsAt: string;
  endsAt: string;
  notes?: string;
}

export type SaveAppointment = Omit<Appointment, 'id'>;
