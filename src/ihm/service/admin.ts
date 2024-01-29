import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admin from '../entities/admin';
import { CreateadminDTO, UpdateadminDTO } from '../ihm.dto';

//ฟังก์ชั่นมีปหใมาแก้ด้วย 152
@Injectable()
 export default class AdminService{
   constructor(
     @InjectRepository(Admin)
     private adminRepository : Repository<Admin>
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
 }
