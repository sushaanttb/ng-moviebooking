import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { MovieTheatre } from 'src/app/movie-theatre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-movie-theatre',
  templateUrl: './delete-movie-theatre.component.html',
  styleUrls: ['./delete-movie-theatre.component.css'],
  providers: [MovieService]
})
export class DeleteMovieTheatreComponent implements OnInit {

  constructor(private movieService: MovieService,
    private location: Location) { }

  movieTheatres: MovieTheatre[] = [];
  showSuccessMessage: boolean = false;

  ngOnInit(): void {
    this.movieService.getAllEmptyMovieTheatresSubscription()
      .subscribe(
        (data: MovieTheatre[]) => this.movieTheatres = data,
        (error) => alert('Some Error Occurred!')
      );
  }

  delete(movieTheatre: MovieTheatre) {
    this.movieService.deleteMovieTheatreSubscription(movieTheatre.id)
      .subscribe(
        (data) => this.handleDeletionSuccess(),
        (error) => alert('Some Error Occurred!')
      );

  }

  handleDeletionSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => { this.showSuccessMessage = false }, 3000);
  }

  goBack() {
    this.location.back();
  }

}
