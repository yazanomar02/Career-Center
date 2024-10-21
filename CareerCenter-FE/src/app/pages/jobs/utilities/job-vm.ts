export class Job {

    constructor(job:Job){
        Object.assign(this,job)
    }
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    count: number | undefined;
    isStoped: boolean | undefined;
    url: string | undefined;
    categoryId: string | undefined
}