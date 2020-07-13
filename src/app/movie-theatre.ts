import { StringMap } from '../app/movie.service';

export class MovieTheatre {

    constructor(
        public name: string,
        public capacity: number,
        public movies: StringMap,
        public currentMovie?: string,
        public id?: string
    ) { }
}