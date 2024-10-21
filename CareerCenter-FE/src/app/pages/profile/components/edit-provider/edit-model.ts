export class EditProvider {
    /**
     *
     */
    constructor(edit: EditProvider) {
        Object.assign(this,edit)
    }
    skills: string | undefined;
    title: string | undefined;
    description: string | undefined;
    durationTime: string | undefined;
    serviceMode: string | undefined;
    phone: string | undefined;
    telegram: string | undefined;
}