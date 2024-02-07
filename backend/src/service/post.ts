import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from 'src/entities/post';
import { CreateCommentDTO, CreatepostDTO, UpdateCommentDTO, UpdatepostDTO} from 'src/ihm/ihm.dto'
import User from 'src/entities/user';
import {fetchDataAndPopulateList, profanityList} from 'src/data/read.data';
import PostNotificationService from './postNotification';


type ReviewMessage = {
    message: string;
};

@Injectable()
export default class PostService {
    getComment(id: number) {
        return this.postRepository.find({
            where : {
                parent : {
                    id : id
                }
            }
        })
    }

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private postNotificationService: PostNotificationService,
        
        ) {}
    getstatus(): string {
        return "OK";
    }
    findAll(): Promise<Post[]> {
        return this.postRepository.find({
            where: {
                parent: null,
                isApproved: true,
            }
        });
    }
    findOne(id: number): Promise<Post | null> {
        return this.postRepository.findOneBy({ id: id });
    }

    async addComment(id: number, user : User, commentDTO: CreateCommentDTO) {
        await this.fetchDataAndPopulateList();
        //console.log('Before hasProfanity:', commentDTO.content);

        if (await this.hasProfanity(commentDTO.content)) {
            // สร้าง Comment ที่มีสถานะรอยืนยันจากแอดมิน
            const unapprovedComment = this.postRepository.create({
              ...commentDTO,
              date: new Date(),
              parent: await this.findOne(id),
              user: user,
              isApproved: false, 
            });
            this.sendToAdminForApproval(commentDTO);
            return await this.postRepository.save(unapprovedComment);
            //return { message: 'Your comment is under review by the admin.', comment: savedComment };
          }
      
          const parentPost = await this.findOne(id);
      
          if (!parentPost) {
            throw new Error('Parent post not found.');
          }
            
        const p = Post.create({
            ...commentDTO,
            date: new Date(),
            parent : await this.findOne(id),
            user : user,
            isApproved: true, 
        })
        
        
        return p.save()
    }
    

    async createPost(createPostDTO: CreatepostDTO, user : User): Promise<Post | ReviewMessage> {
        await fetchDataAndPopulateList();
        console.log('Before hasProfanity:', createPostDTO.content);
        
        if (await this.hasProfanity(createPostDTO.content)){
            console.log('Inside hasProfanity block');
            const unapprovedPost = this.postRepository.create({
                ...createPostDTO,
                date: new Date(),
                isApproved: false,
                user: user,
            })
            this.sendToAdminForApproval(createPostDTO);
            return await this.postRepository.save(unapprovedPost);
            //return { message: 'Your post is under review by the admin.' };
        }
        //console.log('After hasProfanity:', createPostDTO.content);
         const newPost = this.postRepository.create({
                ...createPostDTO,
                date: new Date(),
                user: user,
                isApproved: true,
        });
        
        await this.postRepository.save(newPost);
        
        return newPost;
        
    }
    async updateComment(update : UpdateCommentDTO,id : number,parent : number){
        await fetchDataAndPopulateList();
        //console.log('Before hasProfanity:', update.content);
        if(await this.hasProfanity(update.content)){
            this.sendToAdminForApproval(update)
            const unapprovedupdatecomment = await this.postRepository.findOne({
                where : { 
                    id : id
                }
             });
            if(!unapprovedupdatecomment){
                throw new NotFoundException('Comment not found');
            }
            unapprovedupdatecomment.content = update.content;

            return await this.postRepository.save(unapprovedupdatecomment);
            //return { message: 'Your comment is under review by the admin.' };
        }
        const commentToUpdate = await this.postRepository.findOne({
            where : { 
                id : id
            }
        });
        //console.log(commentToUpdate)
        
        if (!commentToUpdate) {
        throw new NotFoundException('Comment not found');
        }

        commentToUpdate.content = update.content;
        //console.log('Comment updated successfully',commentToUpdate);
        return await this.postRepository.save(commentToUpdate);
    }
    async update(id: number, update: UpdatepostDTO): Promise<Post | ReviewMessage> {
        await fetchDataAndPopulateList();
         
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
            this.sendToAdminForApproval(update);
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

    async DeleteComment(parent : number): Promise<void> {
        const commentToDelete  = await this.postRepository.findOne({
            where : { 
                id : parent
            }
        });

        if (!commentToDelete) {
            console.log('Comment not found');
            return;
        }
        
          // ล็อกข้อมูลที่จะถูกลบ
        console.log('Comment to be deleted:', commentToDelete);
        await this.postRepository.delete(parent)
        console.log('Comment deleted successfully');
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
        //console.log('Content:', content);
        
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
    
    async sendToAdminForApproval(item: any):Promise<void> {
        console.log(`Sending post to admin for approval: ${JSON.stringify(item)}`);
    }
    async approvePost(id: number): Promise<Post>{
        const postToApprove = await this.postRepository.findOne({
            where : {
                id : id
            }
        })

        if(!postToApprove){
            throw new NotFoundException('Post not founf')
        }
        postToApprove.isApproved = true;
        const approvePost = await this.postRepository.save(postToApprove);
        
        this.postNotificationService.sendNotificationToUser(approvePost.user,'Your post has been approved by the admin.');
        return approvePost;
    }
    async rejectPost(id: number): Promise<void> {
        const postToDelete = await this.postRepository.findOne({
            where : {
                id : id
            }
        });
    
        if (!postToDelete) {
          throw new NotFoundException('Post not found');
        }
        const title = "Warning!!!!!!!!!!!!!!!!!!!!!!!";
        const content = `Your posthas been deleted.`;
    
        await this.postRepository.remove(postToDelete);
        // await this.postNotificationService.sendDeletionNotificationToUser({
        //     title: title,
        //     content: content,
        //     username: postToDelete.user.username // หรือข้อมูลผู้ใช้ที่เกี่ยวข้อง เช่น username, email, เป็นต้น
        // });
        // ส่งการแจ้งเตือนไปยังผู้ใช้เมื่อโพสต์ถูกลบ
        //this.postNotificationService.sendDeletionNotificationToUser(postToDelete.user );
      }
       
}
