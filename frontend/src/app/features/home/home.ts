import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { BookCard } from '../../shared/book-card/book-card';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, BookCard],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  private _fb = inject(FormBuilder);
  private _bookService = inject(BookService);

  books = signal<any[]>([]);

  searchForm = this._fb.group({
    query: [''],
    genre: ['']
  });

  genres = [
    'Self Help',
    'Fiction',
    'Business',
    'Technology',
    'Biography'
  ];

  ngOnInit() {
    this.loadAllBooks();

    this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.performSearch(value.query ?? '', value.genre ?? '');
      });
  }

  /**
   * Loads all books
   */
  loadAllBooks() {
    this._bookService.getAll().subscribe(data => {
      this.books.set(data);
    });
  }

  /**
   * Searches for books based on the provided query and genre.
   * @param query 
   * @param genre 
   * @returns books matching the search criteria. If no criteria is provided, it loads all books.
   */
  performSearch(query: string, genre: string) {

    // If no filter → load all
    if (!query && !genre) {
      this.loadAllBooks();
      return;
    }

    this._bookService.searchBooks(query, genre)
      .subscribe(data => {
        this.books.set(data);
      });
  }
}
