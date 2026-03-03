import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}`;

  getAll(query?: any) {
    let params = new HttpParams();

    if (query?.q) params = params.set('q', query.q);
    if (query?.genre) params = params.set('genre', query.genre);

    return this.http.get<any[]>(`${this.base}/books`, { params });
  }

  getById(id: string) {
    return this.http.get<any>(`${this.base}/books/${id}`);
  }

  searchBooks(query?: string, genre?: string) {
  const params: any = {};

  if (query) params.query = query;
  if (genre) params.genre = genre;

  return this.http.get<any[]>(
    `${environment.apiUrl}/search`,
    { params }
  );
}
}