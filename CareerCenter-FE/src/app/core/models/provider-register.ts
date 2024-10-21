export class ProviderRegister {
    /**
     *
     */
    constructor(register: ProviderRegister) {
       Object.assign(this,register)
    }
    
    userId : string | undefined;
    aliasName : string | undefined;
    skills : string | undefined;
    title : string | undefined;
    description : string | undefined;
    imgUrl : string | undefined;
    durationTime : string | undefined;
    serviceMode : string | undefined;
    phone : string | undefined;
    telegram : string | undefined;
}