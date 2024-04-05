import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import PostNotification from '../entities/postNotification';
import { CreateCommentDTO, CreatePostNotification, CreatepostDTO } from 'src/ihm/ihm.dto';
import User from '../entities/user';
import Admin from '../entities/admin';
import Post from 'src/entities/post';
import UserService from './user';

@Injectable()
 export default class PostNotificationService {
   constructor(
     @InjectRepository(PostNotification)
     private notificationRepository: Repository<PostNotification>,
    //  private adminService: AdminService,
    @InjectRepository(Admin)
     private adminRepository : Repository<Admin>,
     @InjectRepository(Post)
     private postRepository: Repository<Post>,
     private userService : UserService
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
   getAdminNotifications(): Promise<PostNotification[]> {
    return this.notificationRepository.find({
      relations:['post','user'],
      where: {
        admin:{
          id : Not(IsNull())
        } 
      },
    });
  }
  getAdminNotificationByID(id:number): Promise<PostNotification[]> {
    return this.notificationRepository.find({
      relations:['post','user'],
      where: {
        admin:{
          id : id
        } 
      },
    });
  }
  async getNotificationsForUser(): Promise<PostNotification[]> {
    return this.notificationRepository.find({
      where: {
        user: Not(IsNull()),
        admin: IsNull()
      },
    });
  }
  async getNotificationforUserById(id:number): Promise<PostNotification[]> {
    return this.notificationRepository.find({
      where: {
        user: {
          id : id
        },
        admin: IsNull()
      }
    });
  }
  async DeleteQuryBuilder(id: number) : Promise<void>{
     await this.notificationRepository.delete({id:id})
  }
  async create(postNotification : CreatePostNotification) : Promise<PostNotification | null>{
    
    const notification = this.notificationRepository.create({
      ...postNotification,
      date: new Date(),
    });
    return notification
   }

   async sendNotificationToPostUser(id:number, post : Post,isPostDeleted = false) {
    try {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const title = "Warning!!!!!!!!!!!!!!!!!!!!!!!";
        const content = `Your posthas been deleted.`;
        const notification = new PostNotification();
          notification.title = title;
          notification.content = content;
          notification.date = new Date();
          notification.user = await this.userService.findById(id); 
      
      await this.notificationRepository.save(notification);
        console.log(`Notification sent to user ${user.username}: ${JSON.stringify(notification)}`);    } catch (error) {
        console.error('Error sending notification to user:', error);
        throw error;
    }
}
    async sendNotificationToUser(user: User,commentDTO:CreateCommentDTO,post: Post){
      const title = `New comment on "${post.content}"`;
      const message = `${user.username} commented : "${commentDTO.content}"`;
      const noti = new PostNotification()
      noti.user = post.user;
      noti.title = title;
      noti.content = message;
      noti.date = new Date();
      noti.post = await this.postRepository.findOne({ where: { id: post.id } })
      await noti.save()
      console.log(noti)
      console.log(`Sending notification to user ${user.username}: ${message}`);
   }
   
   async sendPostNotificationToAdmin(post:Post,user:User){
    const title = `New comment on "${post.content}"`;
    const message = "This potts contains bad words.";
    const Admins: Admin[] = await this.adminRepository.find();
    for (const admin of Admins) {
    const Notification = new PostNotification()
    Notification.admin = admin;
    Notification.title = title;
    Notification.content = message;
    Notification.date = new Date();
    Notification.post = await this.postRepository.findOne({ where: { id: post.id } })
    await Notification.save()
    console.log(Notification)
    }
    console.log(`Sending notification to admin : ${message}`);

   }

   async sendPostNotificationToAdmincomment(post:Post,user:User){
    const title = `Profanity Violation`;
    const message = `This potts contains bad words :"${post.content}"`;
    const Admins: Admin[] = await this.adminRepository.find();
    for (const admin of Admins) {
    const Notification = new PostNotification()
    Notification.admin = admin;
    Notification.title = title;
    Notification.content = message;
    Notification.date = new Date();
    Notification.user = user;
    Notification.post = await this.postRepository.findOne({ where: { id: post.id } })
    await Notification.save()
    // console.log('Parent ID:', Notification.parentId);
    console.log(Notification)
    console.log('user : ',user)
    }
    console.log(`Sending notification to admin : ${message}`);

   }
  
   async sendDeletionNotificationToUser(user: User): Promise<void> {
    const title = "Warning!!!!!!!!!!!!!!!!!!!!!!!";
    const message = `Your posthas been deleted.`;
    console.log(`Sending deletion notification to  ${user.username}: Your post has been deleted.`);
   }
 }