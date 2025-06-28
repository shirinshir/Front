import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id?: number;
  name: string;
  address?: string;
  birthdate?: string;  // ISO строка даты
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/persons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  add(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${person.id}`, person);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
