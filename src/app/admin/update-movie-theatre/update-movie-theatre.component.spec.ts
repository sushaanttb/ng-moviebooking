import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieTheatreComponent } from './update-movie-theatre.component';

describe('UpdateMovieTheatreComponent', () => {
  let component: UpdateMovieTheatreComponent;
  let fixture: ComponentFixture<UpdateMovieTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMovieTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMovieTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
