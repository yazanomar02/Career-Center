export class UserComment {
    /**
     *
     */

    constructor(comment: UserComment) {
        Object.assign(this,comment);
    }
    name: string | undefined;
    email: string | undefined;
    text: string | undefined;
    createdDate: string | undefined;
}