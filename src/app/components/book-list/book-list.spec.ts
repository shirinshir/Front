import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new book', () => {
    const initialLength = component.books.length;

    component.newBook = { title: 'New Book', author: 'New Author' };
    component.addBook();

    expect(component.books.length).toBe(initialLength + 1);
    expect(component.books[component.books.length - 1].title).toBe('New Book');
  });

  it('should not add a book if fields are empty', () => {
    const initialLength = component.books.length;

    component.newBook = { title: '', author: '' };
    component.addBook();

    expect(component.books.length).toBe(initialLength);
  });

  it('should edit a book', () => {
    const book = component.books[0];
    component.editBook(book);

    expect(component.editingBook).toEqual(book);
  });

  it('should save an edited book', () => {
    const originalBook = component.books[0];
    component.editBook(originalBook);
    component.editingBook!.title = 'Updated Title';

    component.saveBook();

    expect(component.books[0].title).toBe('Updated Title');
    expect(component.editingBook).toBeNull();
  });

  it('should delete a book', () => {
    const idToDelete = component.books[0].id;
    const initialLength = component.books.length;

    component.deleteBook(idToDelete);

    expect(component.books.length).toBe(initialLength - 1);
    expect(component.books.find(b => b.id === idToDelete)).toBeUndefined();
  });
});
