import { StringMap } from '../app/movie.service';

export class MovieTheatre {

    constructor(
        public name: string,
        public capacity: Number,
        public movies: StringMap
    ) { }
}