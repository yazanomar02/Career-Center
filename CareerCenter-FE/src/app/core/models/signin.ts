export class SignIn {
    /**
     *
     */
    constructor(signin:SignIn) {
            Object.assign(this,signin);
    }
    email: string | undefined;
    password: string | undefined;
}