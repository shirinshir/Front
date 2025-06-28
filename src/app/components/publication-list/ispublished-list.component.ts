import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IsPublishedService, Publisher } from '../../services/ispublished.service';

@Component({
  selector: 'app-ispublished-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ispublished-list.component.html',
  styleUrls: ['./ispublished-list.component.scss']
})
export class IsPublishedListComponent implements OnInit {
  publications: Publisher[] = [];
  newPublication: Publisher = { id: 0, name: '', isActive: false };
  editingPublication: Publisher | null = null;

  constructor(private publicationService: IsPublishedService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getAll().subscribe({
      next: (data) => this.publications = data,
      error: (err) => console.error('Error loading publications:', err)
    });
  }

  addPublication(): void {
    if (this.newPublication.name.trim()) {
      this.publicationService.create(this.newPublication).subscribe({
        next: () => {
          this.loadPublications();
          this.resetForm();
        },
        error: (err) => console.error('Error adding publication:', err)
      });
    }
  }

  editPublication(publication: Publisher): void {
    this.editingPublication = { ...publication };
  }

  savePublication(): void {
    if (this.editingPublication) {
      this.publicationService.update(this.editingPublication.id, this.editingPublication).subscribe({
        next: () => {
          this.loadPublications();
          this.editingPublication = null;
        },
        error: (err) => console.error('Error saving publication:', err)
      });
    }
  }

  deletePublication(id: number): void {
    this.publicationService.delete(id).subscribe({
      next: () => this.loadPublications(),
      error: (err) => console.error('Error deleting publication:', err)
    });
  }

  resetForm(): void {
    this.newPublication = { id: 0, name: '', isActive: false };
  }
}
