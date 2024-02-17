import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admin from '../entities/admin';
import { CreateadminDTO, UpdateadminDTO} from 'src/ihm/ihm.dto'
import PostService from './post';
import Post from 'src/entities/post';
import PostNotificationService from './postNotification';


//ฟังก์ชั่นมีปหใมาแก้ด้วย 152
@Injectable()
 export default class AdminService{
   constructor(
     @InjectRepository(Admin)
     private adminRepository : Repository<Admin>,
     private postService: PostService,
     @InjectRepository(Post)
     private postRepository : Repository<Post>,
     private postNotificationService : PostNotificationService
   ){}
   getstatus() : string{
     return "OK";
   }
   findAll() : Promise<Admin[]>{
     return this.adminRepository.find();
   }
   findOne(id: number): Promise<Admin | null> {
     return this.adminRepository.findOne({ where: { id: id } });
   }  
   creat(admin : CreateadminDTO) : Promise<Admin | null>{
     admin.roles = 'admin';
     return this.adminRepository.save(admin);
   }
   async updateAdmin(id: number, update: UpdateadminDTO): Promise<Admin | null> {
     const adminToUpdate = await this.adminRepository.findOne({ where: { id: id } });
     if (!adminToUpdate) {
       throw new NotFoundException('Admin not found');
     }
     adminToUpdate.fname = update.fname;
     adminToUpdate.lname = update.lname;
     adminToUpdate.username = update.username;
     adminToUpdate.email = update.email;
     adminToUpdate.password = update.password;
     adminToUpdate.phone = update.phone;
     adminToUpdate.address = update.address;
     adminToUpdate.roles = 'admin';
     return await this.adminRepository.save(adminToUpdate);
    }
   async deleteQuryBuilder(id: number): Promise<void> {
     const adminToDelete = await this.adminRepository.findOne({ where: { id: id } });
  
     if (!adminToDelete) {
       throw new NotFoundException('Admin not found');
     }
  
     await this.adminRepository.remove(adminToDelete);
     const deletedAdmin = await this.adminRepository.findOne({ where: { id: id } });
  
     if (deletedAdmin) {
       console.log('Admin deleted successfully');
     } else {
       console.log('Admin not found after deletion')
     }
   }
  

// async rejectPost(postId) {
//     try {
//         // ดึงข้อมูลโพสต์จากฐานข้อมูล
//         const post = await this.postRepository.findOne(postId);
        
//         // ตรวจสอบว่าโพสต์มีอยู่จริงหรือไม่
//         if (!post) {
//             throw new Error('Post not found');
//         }

//         // ลบโพสต์
//         await this.postRepository.delete(postId);
        
//         // ส่งการแจ้งเตือนไปยังผู้ใช้
//         await this.postNotificationService.sendNotificationToPostUser(post.user.id, 'Your post has been rejected.');

//         // สามารถเพิ่มการดำเนินการอื่น ๆ ตามต้องการ
//     } catch (error) {
//         console.error('Error rejecting post:', error);
//         throw error;
//     }
// }

  
   async isAdmin(id: number): Promise<boolean> {
    const user = await this.adminRepository.findOne({where : {id: id}});
    return user && user.roles && user.roles.includes('admin');
  }
  
 }