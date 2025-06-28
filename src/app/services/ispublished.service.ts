import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Publisher {
  id: number;
  name: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class IsPublishedService {
  private apiUrl = 'http://localhost:8080/api/publishers'; // убедись, что порт соответствует backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }

  create(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.apiUrl, publisher);
  }

  update(id: number, publisher: Publisher): Observable<Publisher> {
    return this.http.put<Publisher>(`${this.apiUrl}/${id}`, publisher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
