import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import Post from 'src/entities/post';
import { CreateCommentDTO, CreatepostDTO, UpdateCommentDTO, UpdatepostDTO} from 'src/ihm/ihm.dto'
import User from 'src/entities/user';
import {fetchDataAndPopulateList, profanityList} from 'src/data/read.data';
import PostNotificationService from './postNotification';
import PostNotification from 'src/entities/postNotification';
import { Console } from 'console';

type ReviewMessage = {
    message: string;
};

@Injectable()
export default class PostService {
    

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        // @InjectRepository(PostNotification)
        // private notificationRepository: Repository<PostNotification>,
        private postNotificationService: PostNotificationService,
        private readonly notificationService: PostNotificationService,
        @InjectRepository(User)
        private userRepository: Repository<User>,) {}
    getComment(id: number) {
        return this.postRepository.find({
            where : {
                parent : {
                    id : id
                }
            }
        })
    }
    async getCommentId(parentId: number): Promise<number> {
        // โค้ดที่ใช้ในการดึงค่า parentId จากฐานข้อมูลหรือที่เก็บข้อมูล
        return parentId;
    }    
    getstatus(): string {
        return "OK";
    }
    findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations:['comments','user','comments.user'],
            where: {
                parent: IsNull(),
                isApproved: true,
            }
        });
    }
    findOne(id: number): Promise<Post | null> {
        return this.postRepository.findOne({
            relations:['comments','user','comments.user'],
            where : { id: id }});
    }
    async search(content: string): Promise<Post[]> {
        return this.postRepository.find({
          where: {
            content: Like(`%${content}%`),
            parent: IsNull(),
          },
        });
      }

    async addComment(id: number, user : User, commentDTO: CreateCommentDTO) {
        await this.fetchDataAndPopulateList();
        //console.log('Before hasProfanity:', commentDTO.content);

        if (!user.roles.includes('user')) {
            throw new Error('User does not have permission to add comments.');
        }

        const parentPost = await this.findOne(id);
      
          if (!parentPost) {
            throw new Error('Parent post not found.');
          }
            console.log(user)
        const p = Post.create({
            ...commentDTO,
            date: new Date(),
            parent : await this.findOne(id),
            user : user,
            isApproved: true, 
        })
        console.log('ok',p)
        await p.save()
        if (await this.hasProfanity(commentDTO.content)) {
            p.isApproved = false; 
            if (!parentPost.isApproved) {
            await this.notificationService.sendPostNotificationToAdmincomment(p,user);
            
            console.log('parentid',parentPost)
            }
        }
        console.log('ok',p.id)
        const commenNOtification = await this.notificationService.sendNotificationToUser(user,commentDTO,parentPost)
        console.log('send',commenNOtification)
        return p 
    }
    

    async createPost(createPostDTO: CreatepostDTO, user : User): Promise<Post | ReviewMessage> {
        await fetchDataAndPopulateList();
        //console.log('Before hasProfanity:', createPostDTO.content);
        
       console.log(user)
       if (!user.roles.includes('user')) {
        throw new Error('User does not have permission to add comments.');
        
        }
        //console.log('After hasProfanity:', createPostDTO.content);
         const newPost = this.postRepository.create({
                ...createPostDTO,
                date: new Date(),
                user: user,
                isApproved: true,
        }); 
         await this.postRepository.save(newPost);
        if (await this.hasProfanity(createPostDTO.content)){
            console.log('Inside hasProfanity block');
            await this.notificationService.sendPostNotificationToAdmincomment(newPost,user)
            //return { message: 'Your post is under review by the admin.' };
        }
        
       
        console.log('PoSt',newPost)
        return newPost;
        
    }
    async updateComment(update : UpdateCommentDTO,id : number,parent : number, user : User){
        await fetchDataAndPopulateList();
        // console.log('Before hasProfanity:', update.content);
        if (!user.roles.includes('user')) {
            throw new Error('User does not have permission to add comments.');
        }
       
        const commentToUpdate = await this.postRepository.findOne({
            where : { 
                id : id,
            }
        });
        //console.log(commentToUpdate)
        
        if (!commentToUpdate) {
        throw new NotFoundException('Comment not found');
        }

        commentToUpdate.content = update.content; 
        if(await this.hasProfanity(update.content)){
            //await this.notificationService.sendPostNotificationToAdmin(update, commentToUpdate,user.id)
            //return { message: 'Your comment is under review by the admin.' };
        }
        //console.log('Comment updated successfully',commentToUpdate);
        return await this.postRepository.save(commentToUpdate);
    }
    async update(id: number, update: UpdatepostDTO, user : User): Promise<Post | ReviewMessage> {
        await fetchDataAndPopulateList();
         
        if (!user.roles.includes('user')) {
            throw new Error('User does not have permission to add comments.');
        }

        if (await this.hasProfanity(update.content)) {
            const unapprovedpostToUpdate = await this.postRepository.findOne({ 
                where : { 
                    id : id 
                } 
            });
            if (!unapprovedpostToUpdate) {
                throw new NotFoundException('Post not found');
            }
            //unapprovedpostToUpdate.title = update.title;
            unapprovedpostToUpdate.content = update.content;
            // this.sendToAdminForApproval(update);
            return await this.postRepository.save(unapprovedpostToUpdate);
        //return { message: 'Your post is under review by the admin.' };
        }

        const postToUpdate = await this.postRepository.findOne({ 
            where : { 
                id : id 
            } 
        });
        
        if (!postToUpdate) {
            throw new NotFoundException('Post not found');
        }
        //postToUpdate.title = update.title;
        postToUpdate.content = update.content;
        

        return await this.postRepository.save(postToUpdate);
    }

    async DeleteQuryBuilder(id: number): Promise<void> {
        const postToDelete = await this.postRepository.findOne({
            where : {
                 id: id 
                }
            });

        // ถ้าไม่พบข้อมูล
        if (!postToDelete) {
            console.log('Post not found');
        return;
        }

         // ล็อกข้อมูลที่จะถูกลบ
        console.log('Post to be deleted :', postToDelete);
        await this.postRepository.delete({ id: id })
        console.log('Post deleted successfully');
    }

    private async fetchDataAndPopulateList() {
        try {
           //console.log('Before fetching data');
            await fetchDataAndPopulateList();
            //console.log('After fetching data');
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }    
    
    private async hasProfanity(content: string): Promise<boolean> {
       // console.log('Content:', content);
        
        for (const profanity of profanityList) {
            //console.log('Checking:', profanity);
            if (content.includes(profanity)) {
                //console.log('Found profanity:', profanity);
                return true; // พบคำหยาบ
            }
        }
    
        //console.log('No profanity found');
        return false; // ไม่พบคำหยาบ
    }
   
    async approvePost(id: number): Promise<Post>{
        const postToApprove = await this.postRepository.findOne({
            
            where : {
                id : id,
                isApproved: false
            }
        }) 

        if(!postToApprove){
            throw new NotFoundException('Post not founf')
        }
        postToApprove.isApproved = true;
        const approvePost = await this.postRepository.save(postToApprove);
        
        return approvePost;
    }
    async rejectPost(postId: number): Promise<void> {
        const postToDelete = await this.postRepository.findOne({
            
            where : {
                id : postId
            },relations:['user']
        });
    
        if (!postToDelete) {
          throw new NotFoundException('Post not found');
        }
            console.log(postId)
            console.log('id',postToDelete)
            await this.postRepository.remove(postToDelete); 
           
        console.log(postToDelete.user.id)
        if (postToDelete.user.id) {
            await this.postNotificationService.sendNotificationToPostUser(postToDelete.user.id,postToDelete);
        } else {
            console.log('Cannot send notification: User or user id is undefined');
        }
      }
      async likePost(postId: number): Promise<Post> {
        const post = await this.postRepository.findOne({
            where : {
                id : postId
            },
        });
        post.likes++;
        return post.save();
      }
}
