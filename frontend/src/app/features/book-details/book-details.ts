import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { ReviewService } from '../../core/services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  imports: [ FormsModule ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  private _route = inject(ActivatedRoute);
  private _bookService = inject(BookService);
  private _reviewService = inject(ReviewService);

  book = signal<any>(null);
  reviews = signal<any[]>([]);

  newReview = {
    reviewerName: '',
    rating: 5,
    comment: ''
  };

  ngOnInit() {
    const id = this._route.snapshot.params['id'];

    this._bookService.getById(id).subscribe(res => {
      this.book.set(res);
    });

    this._reviewService.getByBook(id).subscribe(res => {
      this.reviews.set(res);
      this.newReview = {
        reviewerName: '',
        rating: 5,
        comment: ''
      };
    });
  }

  /**
   * Submits a new review for the current book. 
   * After successfully adding the review, it refreshes the reviews list by calling ngOnInit() again.
   */
  submitReview() {
    const id = this._route.snapshot.params['id'];

    this._reviewService.addReview(id, this.newReview)
      .subscribe(() => this.ngOnInit());
  }

  /**
   * Navigates back to the book list or previous view after viewing book details.
   */
  goBack() {
    window.history.back();
  }
}
