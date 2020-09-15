import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Medication, SaveMedication } from '../models/medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private readonly url = `${environment.apiUrl}/medications`;

  constructor(private http: HttpClient) { }

  list(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.url);
  }

  get(id: number): Observable<Medication> {
    return this.http.get<Medication>(`${this.url}/${id}`);
  }

  create(item: SaveMedication): Observable<Medication> {
    return this.http.post<Medication>(this.url, item);
  }

  update(id: number, item: SaveMedication): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  due(): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.url}/due`);
  }

  markTaken(id: number): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/taken`, {});
  }
}
