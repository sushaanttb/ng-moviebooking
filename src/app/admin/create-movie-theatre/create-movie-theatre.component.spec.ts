import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovieTheatreComponent } from './create-movie-theatre.component';

describe('CreateMovieTheatreComponent', () => {
  let component: CreateMovieTheatreComponent;
  let fixture: ComponentFixture<CreateMovieTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMovieTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMovieTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
