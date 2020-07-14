import { Ticket } from './ticket';

export class User {
    public userName?: string;
    public isAdmin?: string;
    public tickets?: Ticket[];

    constructor(
        fields: {
            userName?: string,
            password?: string,
            address?: string,
            isAdmin?: boolean
            tickets?: Ticket[]
        }
    ) {
        Object.assign(this, fields);
    }
}

