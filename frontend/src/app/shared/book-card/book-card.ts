import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
// @Input() book: any;
  book = input<any>();

  constructor(private _router: Router) {}

  openDetails() {
    this._router.navigate(['/book', this.book()._id]);
  }
}
