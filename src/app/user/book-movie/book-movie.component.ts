import { Component, OnInit } from '@angular/core';
import { MovieService, StringMap } from 'src/app/movie.service';
import { MovieTheatre } from 'src/app/movie-theatre';
import { Location } from '@angular/common';
import { Booking } from 'src/app/booking';
import { User } from 'src/app/user';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css'],
  providers: [MovieService]
})
export class BookMovieComponent implements OnInit {

  maxCapacityInTransaction: number = 9;

  currentUser: User;
  movieTheatres: MovieTheatre[] = [];
  slotMovies: Map<String, String[]> = new Map();

  movieTheatreName: string;
  movieTheatreId: string;
  movieSlot: string;
  movieName: string;
  numOfSeats: number = 1;

  showBookingSuccessMessage: boolean = false;

  constructor(private movieService: MovieService,
    private location: Location) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.movieService.getAllMovieTheatresSubscription()
      .subscribe(
        (data: MovieTheatre[]) => this.successHandlerForGetAllMovies(data),
        (error) => alert('Some Error Occurred!')
      );
  }

  successHandlerForGetAllMovies(response: MovieTheatre[]) {
    this.movieTheatres = response;
  }

  onSelectMovieTheatre(movieTheatreName: string) {
    this.resetAll();
    let movieTheatre = this.movieTheatres.find(m => m.name === movieTheatreName);
    this.movieTheatreId = movieTheatre.id;
    //ToDo: need to update based on existing bookings as well
    if (movieTheatre.capacity < this.maxCapacityInTransaction) this.maxCapacityInTransaction = movieTheatre.capacity;

    Object.keys(movieTheatre.movies).forEach(key => {
      let existingVal = this.slotMovies.get(movieTheatre.movies[key]);

      if (!existingVal) existingVal = [];
      existingVal.push(key);

      this.slotMovies.set(movieTheatre.movies[key], existingVal);
    });

  }

  resetAll() {
    this.slotMovies = new Map();
    this.movieSlot = "";
    this.movieName = "";
    this.numOfSeats = 1;
  }

  resetMovieName() {
    this.movieName = "";
  }

  getMovieSlots(): String[] {
    return Array.from(this.slotMovies.entries()).map(item => item[0]);
  }

  onSelectMovieSlot(movieSlot: string) {
    this.resetMovieName();
  }

  getMovies(): String[] {
    return this.slotMovies.get(this.movieSlot);
  }

  book() {
    let booking: Booking = new Booking(
      {
        'userName': this.currentUser.userName,
        'movieTheatreId': this.movieTheatreId,
        'movieSlot': this.movieSlot,
        // ToDo: check on extra "" in movie name as same is also getting stored as it is in BE
        // 'movieName': this.movieName.substring(1, this.movieName.length - 1),
        'movieName': this.movieName,
        'numOfSeatsBooked': this.numOfSeats
      });

    this.movieService.bookMovieSubscription(booking)
      .subscribe(
        (data: Booking) => this.bookingSuccessHandler(data),
        (error) => alert("Some Error occured!")
      );

  }

  bookingSuccessHandler(bookingResponse: Booking) {
    alert("Booking with Id: " + bookingResponse.id + "at " + bookingResponse.date + " generated successfully!");
    this.resetAll();
    this.showBookingSuccessMessage = true;
    setTimeout(() => this.showBookingSuccessMessage = false, 3000);
  }

  goBack() {
    this.location.back();
  }

}
