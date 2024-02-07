import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { Repository } from 'typeorm';
import { CreateuserDTO,UpdateuserDTO } from 'src/ihm/ihm.dto';
import { validate } from 'class-validator';
import PostService from './post';


@Injectable()
 export default class UserService {
     getstatus() : string{
       return "OK";
     }
     constructor(
       @InjectRepository(User)
       private userRepository : Repository<User>,
       private postService: PostService
     ){}
     findAll() : Promise<User[]>{
       return this.userRepository.find();
     }
     findOne(id : number) : Promise<User | null>{
       return this.userRepository.findOneBy({id:id});
     }
     async findById(id: number): Promise<User> {
      return this.userRepository.findOne({where : { id : id}});
    }
     async creat(user : CreateuserDTO) : Promise<User | null>{
      try{
        const errors = await validate(user);
        if(errors.length > 0 ){
          const errorMessage = errors.map(error => Object.values(error.constraints).join(', ')).join(', ');
          console.error('Validation failed:', errors);
          throw new Error(errorMessage);
        }
        else if(!isValidPassword(user.password) || !isValidPhone(user.phone)){
          throw new BadRequestException('Invalid password or phone format');
        }
        else{
          console.log('Validation successful');
        }
        return await this.userRepository.save(user);
      }
      catch (error) {
        console.error('Error during user creation:', error);
        console.error('Password validation:', isValidPassword(user.password));
        console.error('Phone validation:', isValidPhone(user.phone));
        return null;
      }
      function isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
        if (!passwordRegex.test(password)) {
          return false;
        }
        return true;
      }
      
      function isValidPhone(phone: string): boolean {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
          return false;
        }
        return true;
      }
     }
     
     async update(id: number, update : UpdateuserDTO) : Promise<User | null>{
       const usertoUpdate = await this.userRepository.findOne({ where: { id: id } });
       if (!usertoUpdate) {
         throw new NotFoundException('User not found');
       }
       usertoUpdate.fname = update.fname;
       usertoUpdate.lname = update.lname;
       usertoUpdate.username = update.username;
       usertoUpdate.email = update.email;
       usertoUpdate.password = update.password;
       usertoUpdate.phone = update.phone;
       usertoUpdate.address = update.address;
       usertoUpdate.roles = update.roles;
       return await this.userRepository.save(usertoUpdate);
     }
     async DeleteQuryBuilder(id : number) : Promise<void>{
       await this.userRepository.delete({id:id})
     }
     
 }