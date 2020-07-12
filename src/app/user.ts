export class User {
    public userName?: string;
    public isAdmin?: string;

    constructor(
        fields: {
            userName?: string,
            password?: string,
            address?: string,
            isAdmin?: boolean
        }
    ) {
        Object.assign(this, fields);
    }
}

