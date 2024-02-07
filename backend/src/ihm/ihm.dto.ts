import {  IsAlphanumeric, IsEmail, IsNotEmpty, IsNumberString, IsString, Length, Matches } from 'class-validator'

export class CreateuserDTO{

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
   
    @IsNotEmpty()
    @IsAlphanumeric()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, { message: 'Password must contain at least one digit, one lowercase, and one uppercase letter.' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
    password: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be exactly 11 digits.' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;
    
}
export class UpdateuserDTO{

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @IsNotEmpty()
    @IsAlphanumeric()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, { message: 'Password must contain at least one digit, one lowercase, and one uppercase letter.' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
    password: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits.' })
    phone: string;


    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    roles: string[];

}
export class CreateadminDTO{

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, { message: 'Password must contain at least one digit, one lowercase, and one uppercase letter.' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
    password: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits.' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}
export class UpdateadminDTO{

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, { message: 'Password must contain at least one digit, one lowercase, and one uppercase letter.' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
    password: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits.' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}
export class CreatepostDTO{
    
    @IsNotEmpty()
    @IsString()
    content: string;

}
export class UpdatepostDTO{
    
    @IsNotEmpty()
    @IsString()
    content: string;

}

export  class CreateCommentDTO{
    @IsNotEmpty()
    @IsString()
    content: string;
}
export  class UpdateCommentDTO{
    @IsNotEmpty()
    @IsString()
    content: string;
}

export default class CreatePostNotification{
    @IsNotEmpty()
    @IsString()
    title:string;
    
    @IsNotEmpty()
    @IsString()
    content: string;
}