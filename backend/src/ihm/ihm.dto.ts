import {  IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator'

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
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, { 
    message: 'Password must contain at least one digit, one lowercase, and one uppercase letter.' 
    })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
    password: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be exactly 11 digits.' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    
    @IsString()
    @IsOptional()
    roles: string|null; 
    
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

    @IsString()
    roles: string;

    @IsNotEmpty()
    image: string;;

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

    @IsNotEmpty()
    image: string;

    
    @IsNotEmpty()
    @IsString()
    roles: string; 
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

    @IsNotEmpty()
    image: string;

    
    @IsNotEmpty()
    @IsString()
    roles: string; 
}
export class CreatepostDTO{
    
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    image: string;;

}
export class UpdatepostDTO{
    
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    image: Buffer;
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

export class CreatePostNotification{
    @IsNotEmpty()
    @IsString()
    title:string;
    
    @IsNotEmpty()
    @IsString()
    content: string;
}