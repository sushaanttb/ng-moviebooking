export class Booking {
    public id: string;
    public userName: string;
    public movieTheatreId: string;
    public movieName: string;
    public movieSlot: string;
    public numOfSeatsBooked: number;
    public date: Date;


    constructor(
        fields: {
            id?: string,
            userName?: string,
            movieTheatreId?: string,
            movieName?: string,
            movieSlot?: string,
            numOfSeatsBooked?: number
            date?: Date
        }
    ) {
        Object.assign(this, fields);
    }
}