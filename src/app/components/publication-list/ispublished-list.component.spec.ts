import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IsPublishedListComponent } from './ispublished-list.component';
import { IsPublishedService, IsPublished } from '../services/ispublished.service';
import { of } from 'rxjs';

describe('IsPublishedListComponent', () => {
  let component: IsPublishedListComponent;
  let fixture: ComponentFixture<IsPublishedListComponent>;
  let service: jasmine.SpyObj<IsPublishedService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('IsPublishedService', ['getAll', 'create', 'update', 'delete']);

    await TestBed.configureTestingModule({
      imports: [IsPublishedListComponent],
      providers: [{ provide: IsPublishedService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(IsPublishedListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(IsPublishedService) as jasmine.SpyObj<IsPublishedService>;

    service.getAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load publications on init', () => {
    const pubs: IsPublished[] = [{ id: 1, name: 'Test', isFinal: true }];
    service.getAll.and.returnValue(of(pubs));
    component.loadPublications();
    expect(component.publications).toEqual(pubs);
  });

  it('should add a publication', () => {
    service.create.and.returnValue(of({ id: 1, name: 'New', isFinal: false }));
    service.getAll.and.returnValue(of([{ id: 1, name: 'New', isFinal: false }]));
    component.newPublication = { id: 0, name: 'New', isFinal: false };
    component.addPublication();
    expect(service.create).toHaveBeenCalledWith(component.newPublication);
  });

  it('should edit and save a publication', () => {
    const pub = { id: 1, name: 'EditMe', isFinal: true };
    component.editPublication(pub);
    expect(component.editingPublication).toEqual(pub);

    service.update.and.returnValue(of(void 0));
    service.getAll.and.returnValue(of([pub]));

    component.savePublication();
    expect(service.update).toHaveBeenCalledWith(pub.id, pub);
    expect(component.editingPublication).toBeNull();
  });

  it('should delete a publication', () => {
    service.delete.and.returnValue(of(void 0));
    service.getAll.and.returnValue(of([]));
    component.deletePublication(1);
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
