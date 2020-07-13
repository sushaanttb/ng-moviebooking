import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMovieTheatreComponent } from './delete-movie-theatre.component';

describe('DeleteMovieTheatreComponent', () => {
  let component: DeleteMovieTheatreComponent;
  let fixture: ComponentFixture<DeleteMovieTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMovieTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMovieTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
