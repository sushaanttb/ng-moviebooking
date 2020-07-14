import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { Location } from '@angular/common';
import { Booking } from 'src/app/booking';

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

    let tmpBookings: Booking[] = [];
    let availableMovieSeats: number = 0;

    for (let i = 0; i < names.length; i++) {

      availableMovieSeats = movieTheatre.capacity;
      tmpBookings = movieTheatre.bookings[names[i]];

      if (tmpBookings) {
        tmpBookings.forEach((b: Booking) => availableMovieSeats -= b.numOfSeatsBooked);
      }

      movieArray.push(names[i] + " (" + slots[i] + ") " + ((availableMovieSeats == 0) ? ' Sold Out! ' : "Available seats: " + availableMovieSeats));

    }
    return movieArray;
  }

  goBack() {
    this.location.back();
  }

}
