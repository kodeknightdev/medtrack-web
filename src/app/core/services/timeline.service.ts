import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TimelineItem } from '../models/timeline-item';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private readonly url = `${environment.apiUrl}/timeline`;

  constructor(private http: HttpClient) { }

  get(from?: Date, to?: Date): Observable<TimelineItem[]> {
    let params = new HttpParams();
    if (from) {
      params = params.set('from', from.toISOString());
    }
    if (to) {
      params = params.set('to', to.toISOString());
    }
    return this.http.get<TimelineItem[]>(this.url, { params });
  }
}
