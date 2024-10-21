export class SignUp{
    constructor(signup:SignUp) {
        Object.assign(this,signup);
}
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
}