import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _http = inject(HttpClient);
  private base = `${environment.apiUrl}`;

  /**
   * Fetches all books, optionally filtered by query and genre.
   */
  getAll(query?: any) {
    let params = new HttpParams();

    if (query?.q) params = params.set('q', query.q);
    if (query?.genre) params = params.set('genre', query.genre);

    return this._http.get<any[]>(`${this.base}/books`, { params });
  }

  /**
   * Gets a book by its ID.
   * @param id 
   * @returns book based on id
   */
  getById(id: string) {
    return this._http.get<any>(`${this.base}/books/${id}`);
  }

  /**
   * Searches for books based on query and genre.
   * @param query 
   * @param genre 
   * @returns book if fulfils the filter condition
   */
  searchBooks(query?: string, genre?: string) {
    const params: any = {};

    if (query) params.query = query;
    if (genre) params.genre = genre;

    return this._http.get<any[]>(`${environment.apiUrl}/search`, { params });
  }
}
