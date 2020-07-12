export class User {
    public userName?: string;
    public isAdmin?: string;
    public tickets?: any[];

    constructor(
        fields: {
            userName?: string,
            password?: string,
            address?: string,
            isAdmin?: boolean
            tickets?: any[]
        }
    ) {
        Object.assign(this, fields);
    }
}

