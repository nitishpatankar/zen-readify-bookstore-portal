import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/reviews`;

  getByBook(bookId: string) {
    return this.http.get<any[]>(`${this.base}/${bookId}`);
  }

  addReview(bookId: string, data: any) {
    return this.http.post(`${this.base}/${bookId}`, data);
  }
}