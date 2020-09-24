import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SymptomService } from './symptom.service';
import { environment } from '../../../environments/environment';

describe('SymptomService', () => {
  let service: SymptomService;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/symptoms`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SymptomService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists symptoms', () => {
    service.list().subscribe(list => expect(list.length).toBe(1));
    http.expectOne(url).flush([{ id: 1, name: 'Headache', severity: 3, occurredAt: '', createdAt: '' }]);
  });

  it('puts updates to the item url', () => {
    service.update(4, { name: 'Cough', severity: 2, occurredAt: '2020-08-01T10:00:00Z' }).subscribe();
    const req = http.expectOne(`${url}/4`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('deletes by id', () => {
    service.delete(9).subscribe();
    expect(http.expectOne(`${url}/9`).request.method).toBe('DELETE');
  });
});
