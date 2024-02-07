import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostNotification from '../entities/postNotification';
import CreatePostNotification from '../ihm/ihm.dto';
import User from '../entities/user';

@Injectable()
 export default class PostNotificationService {
   constructor(
     @InjectRepository(PostNotification)
     private notificationRepository: Repository<PostNotification>,
   ) {}
   getstatus() : string{
     return "OK";
   }
   findAll() : Promise<PostNotification[]>{
     return this.notificationRepository.find();
   }
   findOne(id : number) : Promise<PostNotification | null>{
     return this.notificationRepository.findOneBy({id:id});
   }
   async DeleteQuryBuilder(id: number) : Promise<void>{
     await this.notificationRepository.delete({id:id})
   }
   create(postNotification : CreatePostNotification) : Promise<PostNotification | null>{
    return this.notificationRepository.save(postNotification)
   }
   async sendNotificationToUser(user: User,message: string): Promise<void> {
    //const message = "This is a general notification for you.";
    console.log(`Sending notification to user ${user.username}: ${message}`);
   }
   //Warning
   async sendDeletionNotificationToUser(user: User): Promise<void> {
    const title = "Warning!!!!!!!!!!!!!!!!!!!!!!!";
    const message = `Your posthas been deleted.`;
    console.log(`Sending deletion notification to  ${user.username}: Your post has been deleted.`);
   }
 }