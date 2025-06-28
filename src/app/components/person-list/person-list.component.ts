import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonService, Person } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  newPerson: Person = {
    name: '',
    address: '',
    birthdate: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  };

  editingPerson: Person | null = null;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.personService.getAll().subscribe({
      next: people => this.persons = people,
      error: err => console.error('Ошибка загрузки людей', err)
    });
  }

  addPerson(): void {
    if (this.newPerson.name.trim()) {
      this.personService.add(this.newPerson).subscribe({
        next: added => {
          this.persons.push(added);
          this.newPerson = {
            name: '',
            address: '',
            birthdate: '',
            email: '',
            password: '',
            phone: '',
            role: ''
          };
        },
        error: err => console.error('Ошибка добавления', err)
      });
    }
  }

  editPerson(person: Person): void {
    this.editingPerson = { ...person };
  }

  cancelEdit(): void {
    this.editingPerson = null;
  }

  savePerson(): void {
    if (this.editingPerson != null) {
      this.personService.update(this.editingPerson).subscribe({
        next: updated => {
          const index = this.persons.findIndex(p => p.id === updated.id);
          if (index !== -1) this.persons[index] = updated;
          this.editingPerson = null;
        },
        error: err => console.error('Ошибка обновления', err)
      });
    }
  }

  deletePerson(id: number): void {
    this.personService.delete(id).subscribe({
      next: () => this.persons = this.persons.filter(p => p.id !== id),
      error: err => console.error('Ошибка удаления', err)
    });
  }
}
