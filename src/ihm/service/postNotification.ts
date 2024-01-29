import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostNotification from '../entities/postNotification';
import CreatePostNotification from '../ihm.dto';
import fetchData from 'src/data/read.data';

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
   async checkProfanity(postContent: string):Promise<boolean> {
    // รายการคำหยาบที่ต้องการตรวจสอบ
    const profanityList: string[] = await fetchData();
  
    for (const profanity of profanityList) {
      const regex = new RegExp(`\\b${profanity}\\b`, 'i');
      
      if (regex.test(postContent)) {
        return true;  // พบคำหยาบ
      }
    }
  
    return false;  // ไม่พบคำหยาบ
  }
 }