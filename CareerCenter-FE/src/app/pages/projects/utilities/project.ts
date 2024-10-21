
export class Project {

    constructor(project:Project){
        Object.assign(this,project)
    }
    id: string | undefined;
    userId: string | undefined;
    title: string | undefined;
    description: string | undefined;
    createdDate: string | undefined;
}