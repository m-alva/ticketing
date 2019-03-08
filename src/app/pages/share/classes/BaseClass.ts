
export class BaseClass{
    constructor(obj){
        for(let key in obj){
            this[key] = obj[key];
        }
    }
    getKeys(){
        return Object.keys(this);
    }
}