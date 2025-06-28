import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  name: string;
  authorId: number;
  publisherId: number;
  readerId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
