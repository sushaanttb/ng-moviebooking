import { Component, OnInit } from '@angular/core';
import { MovieTheatreInterface, MovieService } from '../../movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-movie-theatre',
  templateUrl: './create-movie-theatre.component.html',
  styleUrls: ['./create-movie-theatre.component.css'],
  providers: [MovieService]
})
export class CreateMovieTheatreComponent implements OnInit {

  constructor(private movieService: MovieService,
    private location: Location) { }

  name: string;
  capacity: number = 100;
  // moviesMap: Map<Number, { name: string, slot: string }> = new Map();
  movies: Array<MovieTheatreInterface> = [];

  // movieSlots: Array<string> = ['MORNING', 'AFTERNOON', 'EVENING'];
  movieSlots: Array<string> = ['Morning', 'Afternoon', 'Evening'];

  movieCapacities: Array<number> = [10, 20, 50, 100, 200];

  ngOnInit(): void {
    this.addMovies();
  }

  addMovies() {

    this.movieSlots.forEach(el => {
      this.movies.push({ name: '', slot: el });
    });
  }

  submit() {
    this.movieService.createMovieTheatreSubscription(this.name, this.capacity, this.movies)
      .subscribe(
        (data: Response) => this.handleSuccess(),
        (error) => {
          alert('Some Error Occurred!')
        });

  }

  handleSuccess() {
    alert("Movie Theatre " + this.name + " created Successfully!");
    this.reset();
  }

  reset() {
    this.name = "";
    this.capacity = 100;
    this.movies = [];
    this.addMovies();
  }
  // addMovie() {
  //   if (this.moviesMap.size < this.movieSlots.length)
  //     this.moviesMap.set(this.moviesMap.size, { name: '', slot: '' });
  // }

  // setMovieObj(movieName: string, movieSlot: string, index: number) {
  //   let movieObj = {
  //     name: movieName,
  //     slot: movieSlot
  //   }
  //   this.moviesMap.set(index, movieObj);
  // }

  // getMovieEntries() {
  //   return Array.from(this.moviesMap.entries()).map(item => item[1]);
  // }

  goBack() {
    this.location.back();
  }
}
