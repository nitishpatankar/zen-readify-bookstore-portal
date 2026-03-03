import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private _http = inject(HttpClient);
  private base = `${environment.apiUrl}/reviews`;

  /**
   * Fetches reviews for a specific book.
   * @param bookId The ID of the book for which to fetch reviews.
   * @returns An observable containing an array of reviews for the specified book.
   */
  getByBook(bookId: string) {
    return this._http.get<any[]>(`${this.base}/${bookId}`);
  }

  /**
   * Adds a new review for a specific book.
   * @param bookId The ID of the book for which to add a review.
   * @param data The review data to be added.
   * @returns An observable containing the result of the POST request.
   */
  addReview(bookId: string, data: any) {
    return this._http.post(`${this.base}/${bookId}`, data);
  }
}
