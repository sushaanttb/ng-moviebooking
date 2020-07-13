import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { MovieTheatre } from 'src/app/movie-theatre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-movie-theatre',
  templateUrl: './update-movie-theatre.component.html',
  styleUrls: ['./update-movie-theatre.component.css'],
  providers: [MovieService]
})
export class UpdateMovieTheatreComponent implements OnInit {

  constructor(private movieService: MovieService,
    private location: Location) { }

  movieTheatres: MovieTheatre[] = [];
  movieCapacities: Array<number> = [50, 100, 200];
  movieTheatreSuccessMessage: string = "Movie Theatre updated successfully!";
  showSuccessMessage: boolean = false;


  ngOnInit(): void {
    this.movieService.getAllMovieTheatresSubscription()
      .subscribe(
        (data: MovieTheatre[]) => this.successHandlerForGetAllMovies(data),
        (error) => alert('Some Error Occurred!')
      );
  }

  successHandlerForGetAllMovies(response: MovieTheatre[]) {
    this.movieTheatres = response;
  }

  getMovies(movieTheatre: MovieTheatre) {
    let movieArray = [];
    let names: string[] = Object.keys(movieTheatre.movies);
    let slots: string[] = Object.values(movieTheatre.movies);
    for (let i = 0; i < names.length; i++)
      movieArray.push(names[i] + " (" + slots[i] + ") ");
    return movieArray;
  }

  update(movieTheatre: MovieTheatre) {
    this.movieService.updateMovieTheatreSubscription(movieTheatre)
      .subscribe(
        (data) => this.successHandlerForUpdateMovieTheatre(),
        (error) => alert("Some Error occured!")
      );

  }
  successHandlerForUpdateMovieTheatre() {
    this.showSuccessMessage = true;
    setTimeout(() => { this.showSuccessMessage = false }, 3000);
  }


  goBack() {
    this.location.back();
  }
}
