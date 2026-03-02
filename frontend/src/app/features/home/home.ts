import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { BookCard } from '../../shared/book-card/book-card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, FormsModule, BookCard ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private bookService = inject(BookService);

  books = signal<any[]>([]);
  searchText = signal<string>('');
  selectedGenre = signal<string>('');

  // books = signal<any[]>([]);
  totalPages = signal(1);
  currentPage = signal(1);
  limit = 8;

  loading = signal(false);

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAll().subscribe(res => {
      this.books.set(res.data || res);
    });
  }

  search() {
    this.bookService
      .getAll({
        q: this.searchText(),
        genre: this.selectedGenre()
      })
      .subscribe(res => {
        this.books.set(res.data || res);
      });
  }
}
