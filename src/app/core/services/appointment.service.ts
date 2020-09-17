import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Appointment, SaveAppointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly url = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) { }

  list(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url);
  }

  get(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.url}/${id}`);
  }

  create(item: SaveAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.url, item);
  }

  update(id: number, item: SaveAppointment): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  upcoming(days = 14): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.url}/upcoming`, { params: { days: String(days) } });
  }
}
