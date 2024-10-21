export class Audit {
    constructor(audit: Audit) {
        const { id, ...rest } = audit;
        Object.assign(this, rest);
    }
    id: string | undefined;
    userId: string | undefined;
    status: string | undefined;
    message: string | undefined;
    url: string | undefined;
    createdDate: string | undefined;
}