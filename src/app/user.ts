export class User{
    id:number;

    constructor(
       
        public userName: string,
        public password: string,
        public email: string,
        
        public firstName: string,
        public lastName: string,
        
    ){}
}