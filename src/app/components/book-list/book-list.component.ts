import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = {
    name: '',
    authorId: 0,
    publisherId: 0,
    readerId: 0
  };
  editingBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: books => this.books = books,
      error: err => console.error('Ошибка загрузки книг', err)
    });
  }

  addBook(): void {
    if (this.newBook.name.trim()) {
      this.bookService.add(this.newBook).subscribe({
        next: added => {
          this.books.push(added);
          this.newBook = { name: '', authorId: 0, publisherId: 0, readerId: 0 };
        },
        error: err => console.error('Ошибка добавления книги', err)
      });
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  saveBook(): void {
    if (this.editingBook) {
      this.bookService.update(this.editingBook).subscribe({
        next: updated => {
          const index = this.books.findIndex(b => b.id === updated.id);
          if (index !== -1) this.books[index] = updated;
          this.editingBook = null;
        },
        error: err => console.error('Ошибка обновления книги', err)
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.delete(id).subscribe({
      next: () => this.books = this.books.filter(b => b.id !== id),
      error: err => console.error('Ошибка удаления книги', err)
    });
  }
}
