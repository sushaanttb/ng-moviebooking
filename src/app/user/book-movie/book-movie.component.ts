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

  maxSeatsInTransaction: number = 9;

  currentUser: User;
  movieTheatres: MovieTheatre[] = [];
  slotMovies: Map<String, String[]> = new Map();
  bookingsMap: Map<String, Booking[]> = new Map();
  movieTheatreCapacity: number;
  availableSeats: number;


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
    this.fetchMovieTheatres();

  }

  fetchMovieTheatres() {
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
    this.resetAllDependencies();
    let movieTheatre = this.movieTheatres.find(m => m.name === movieTheatreName);

    this.updateSelectedMovieTheatreInfo(movieTheatre);
    this.fillBookings(movieTheatre);
    this.fillSlotMovies(movieTheatre);
  }

  updateSelectedMovieTheatreInfo(movieTheatre: MovieTheatre) {
    this.movieTheatreId = movieTheatre.id;
    this.movieTheatreCapacity = movieTheatre.capacity;
    if (movieTheatre.capacity < this.maxSeatsInTransaction) this.maxSeatsInTransaction = movieTheatre.capacity;
  }

  fillSlotMovies(movieTheatre: MovieTheatre) {
    Object.keys(movieTheatre.movies).forEach(key => {
      let existingVal = this.slotMovies.get(movieTheatre.movies[key]);

      if (!existingVal) existingVal = [];
      existingVal.push(key);

      this.slotMovies.set(movieTheatre.movies[key], existingVal);
    });
  }

  fillBookings(movieTheatre: MovieTheatre) {
    Object.keys(movieTheatre.bookings).forEach(key => {
      let existingVal: Booking[] = this.bookingsMap.get(key);

      if (!existingVal || existingVal.length == 0) existingVal = [];
      movieTheatre.bookings[key].forEach(val => existingVal.push(val));

      this.bookingsMap.set(key, existingVal);
    });
  }


  resetAllDependencies() {
    this.slotMovies = new Map();
    this.movieSlot = "";
    this.movieName = "";
    this.numOfSeats = 1;
    this.bookingsMap = new Map();
    this.movieTheatreCapacity = 0;
    this.availableSeats = 0;
  }

  resetMovieDependencies() {
    this.movieName = "";
    this.availableSeats = 0;
  }

  getMovieSlots(): String[] {
    return Array.from(this.slotMovies.entries()).map(item => item[0]);
  }

  onSelectMovieSlot(movieSlot: string) {
    this.resetMovieDependencies();
  }

  onSelectMovie(movieName: String) {
    this.updateBookingCapacity(movieName);
  }

  updateBookingCapacity(movieName: String) {
    let existingBookings = 0;
    if (this.bookingsMap.get(movieName)) {
      this.bookingsMap.get(movieName).forEach((b: Booking) => {
        existingBookings += b.numOfSeatsBooked;
      });
    }

    this.availableSeats = this.movieTheatreCapacity - existingBookings;

    if (this.availableSeats < this.maxSeatsInTransaction) this.maxSeatsInTransaction = this.availableSeats;
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
    this.resetAllDependencies();
    this.showBookingSuccessMessage = true;
    setTimeout(() => this.showBookingSuccessMessage = false, 3000);
    this.fetchMovieTheatres();
  }

  goBack() {
    this.location.back();
  }

}
