import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { Location } from '@angular/common';
import { MovieTheatre } from 'src/app/movie-theatre';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
  providers: [MovieService]
})
export class ListMovieComponent implements OnInit {

  movieTheatres: MovieTheatre[] = [];

  constructor(private movieService: MovieService,
    private location: Location) { }

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

  goBack() {
    this.location.back();
  }

}
