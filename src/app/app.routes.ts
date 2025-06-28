import { Routes } from '@angular/router';

import { PersonListComponent } from './components/person-list/person-list.component';
import { IsPublishedListComponent } from './components/publication-list/ispublished-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HomeComponent } from './homePage/home/home';  // импорт главной страницы

export const routes: Routes = [
  { path: '', component: HomeComponent },              // корень — главная с кнопками
  { path: 'persons', component: PersonListComponent },
  { path: 'publishers', component: IsPublishedListComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '' }  // fallback на главную страницу
];
