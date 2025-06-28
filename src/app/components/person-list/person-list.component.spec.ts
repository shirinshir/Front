import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { PersonService, Person } from '../services/person.service';
import { of } from 'rxjs';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let service: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PersonService', ['getAll', 'create', 'update', 'delete']);

    await TestBed.configureTestingModule({
      imports: [PersonListComponent],
      providers: [{ provide: PersonService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;

    service.getAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load persons on init', () => {
    const persons: Person[] = [{ id: 1, name: 'Test', birthdate: '1990-01-01', email: 'test@mail.com', phone: '123', address: 'Addr' }];
    service.getAll.and.returnValue(of(persons));
    component.loadPersons();
    expect(component.persons).toEqual(persons);
  });

  it('should add a person', () => {
    const newPerson: Person = { id: 0, name: 'New', birthdate: '2000-01-01', email: 'new@mail.com', phone: '456', address: 'Addr2' };
    service.create.and.returnValue(of(newPerson));
    service.getAll.and.returnValue(of([newPerson]));

    component.newPerson = newPerson;
    component.addPerson();

    expect(service.create).toHaveBeenCalledWith(newPerson);
  });

  it('should edit and save a person', () => {
    const person: Person = { id: 1, name: 'EditMe', birthdate: '1999-12-12', email: 'edit@mail.com', phone: '789', address: 'Addr3' };
    component.editPerson(person);
    expect(component.editingPerson).toEqual(person);

    service.update.and.returnValue(of(void 0));
    service.getAll.and.returnValue(of([person]));

    component.savePerson();

    expect(service.update).toHaveBeenCalledWith(person.id, person);
    expect(component.editingPerson).toBeNull();
  });

  it('should delete a person', () => {
    service.delete.and.returnValue(of(void 0));
    service.getAll.and.returnValue(of([]));

    component.deletePerson(1);
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
