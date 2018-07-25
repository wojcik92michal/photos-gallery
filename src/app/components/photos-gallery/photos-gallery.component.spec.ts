import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosGalleryComponent } from './photos-gallery.component';

describe('PhotosGalleryComponent', () => {
  let component: PhotosGalleryComponent;
  let fixture: ComponentFixture<PhotosGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
