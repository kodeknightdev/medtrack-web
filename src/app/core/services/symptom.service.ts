import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Symptom, SaveSymptom } from '../models/symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private readonly url = `${environment.apiUrl}/symptoms`;

  constructor(private http: HttpClient) { }

  list(): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(this.url);
  }

  get(id: number): Observable<Symptom> {
    return this.http.get<Symptom>(`${this.url}/${id}`);
  }

  create(item: SaveSymptom): Observable<Symptom> {
    return this.http.post<Symptom>(this.url, item);
  }

  update(id: number, item: SaveSymptom): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
