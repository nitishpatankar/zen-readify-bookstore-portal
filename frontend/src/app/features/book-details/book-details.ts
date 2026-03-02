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
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private reviewService = inject(ReviewService);

  book = signal<any>(null);
  reviews = signal<any[]>([]);

  newReview = {
    reviewerName: '',
    rating: 5,
    comment: ''
  };

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.bookService.getById(id).subscribe(res => {
      this.book.set(res);
    });

    this.reviewService.getByBook(id).subscribe(res => {
      this.reviews.set(res);
    });
  }

  submitReview() {
    const id = this.route.snapshot.params['id'];

    this.reviewService.addReview(id, this.newReview)
      .subscribe(() => this.ngOnInit());
  }
}
