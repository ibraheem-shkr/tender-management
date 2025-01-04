import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tender {
  tenderReferenceNumber: string;
  customerName: string;
  description: string;
  issueDate: Date;
  closingDate: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private apiUrl = 'http://localhost:5000/api/tender'; // Update with your actual API endpoint

  constructor(private http: HttpClient) { }

  createTender(tender: Tender): Observable<Tender> {
    return this.http.post<Tender>(this.apiUrl, tender);
  }

  getTenderById(id: number): Observable<Tender> {
    return this.http.get<Tender>(`${this.apiUrl}/${id}`);
  }

  getTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(this.apiUrl);
  }
}