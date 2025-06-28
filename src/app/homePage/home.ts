import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  links = [
    { path: '/books', text: 'Books' },
    { path: '/publications', text: 'Is Published' },
    { path: '/persons', text: 'Persons' }
  ];

}
