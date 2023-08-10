export class User{
    constructor(
        public uid:string='',
        public name:string='',
        public email:string='',
        public password:string='',
        public about:string='',
        public displayName:string='',
        public imageUrl:string='',
        public emailVeryfied:boolean=false,
        
    ){}
}