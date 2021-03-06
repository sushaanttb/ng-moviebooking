import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieTheatre } from '../app/movie-theatre';
import { Booking } from '../app/booking';
import { Observable } from 'rxjs';

const movieTheatreAPI = "http://localhost:8080/movie-theatre";

export class MovieTheatreInterface { name: string; slot: string };
//ToDo: angular http bug
//https://github.com/angular/angular/issues/32117
export interface StringMap { [key: string]: string }
export interface BookingMap { [key: string]: Booking[] }

@Injectable({ providedIn: 'root' })
export class MovieService {

  constructor(private http: HttpClient) { }

  createMovieTheatreSubscription(name: string, capacity: number, movies: Array<MovieTheatreInterface>)
    : Observable<Object> {

    // let moviesMap: Map<string, string> = new Map();
    let moviesMap: StringMap = {};
    movies.forEach(m => moviesMap[JSON.stringify(m.name)] = m.slot);

    let movieTheatreObj = new MovieTheatre(name, capacity, moviesMap);

    return this.http.post(movieTheatreAPI, movieTheatreObj);
  }

  getAllMovieTheatresSubscription(): Observable<MovieTheatre[]> {
    return this.http.get<MovieTheatre[]>(movieTheatreAPI + "/all");
  }

  updateMovieTheatreSubscription(movieTheatre: MovieTheatre): Observable<Object> {
    return this.http.put(movieTheatreAPI, movieTheatre);
  }

  getAllEmptyMovieTheatresSubscription(): Observable<MovieTheatre[]> {
    return this.http.get<MovieTheatre[]>(movieTheatreAPI + "/empty");
  }

  deleteMovieTheatreSubscription(id: string): Observable<Object> {
    return this.http.delete(movieTheatreAPI + "?id=" + id);
  }

  bookMovieSubscription(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(movieTheatreAPI + "/book", booking);
  }

}
