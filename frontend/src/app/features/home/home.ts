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

  private fb = inject(FormBuilder);
  private bookService = inject(BookService);

  books = signal<any[]>([]);

  searchForm = this.fb.group({
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

    // Load all books initially
    this.loadAllBooks();

    // 🔥 Debounced search
    this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.performSearch(value.query ?? '', value.genre ?? '');
      });
  }

  loadAllBooks() {
    this.bookService.getAll().subscribe(data => {
      this.books.set(data);
    });
  }

  performSearch(query: string, genre: string) {

    // If no filter → load all
    if (!query && !genre) {
      this.loadAllBooks();
      return;
    }

    this.bookService.searchBooks(query, genre)
      .subscribe(data => {
        this.books.set(data);
      });
  }
}