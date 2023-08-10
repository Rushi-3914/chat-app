

export class Message{
    constructor(
       public message:string='',
       public date :string=new Date().toString(), 
       public to:string='',
       public from:string='',
       ){

       }
}