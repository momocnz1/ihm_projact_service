import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import  AdminService  from '../service/admin';
import Admin from '../entities/admin';
import { CreateadminDTO, UpdateadminDTO } from '../ihm.dto';

@Controller('admin')
export default class AdminController{
  constructor(private readonly adminService: AdminService) {}

  @Get('status')
  getStatus() : string{
    return this.adminService.getstatus();
  }
  @Get()
  getIndex(@Req() request : Request): Promise<Admin[]> {
    return this.adminService.findAll();
  }
  @Get(':id')
    getByid(@Param('id') id : number) : Promise<Admin>{
        return this.adminService.findOne(id)
    }
  @Put(':id')
    updateAdmin(@Param('id') id: number, @Body() updateAdminDTO: UpdateadminDTO): Promise<Admin | null> {
      return this.adminService.updateAdmin(id, updateAdminDTO);
    }
  @Post()
  postCreat(@Body() createadminDTO : CreateadminDTO): Promise<Admin>{
    return this.adminService.creat(createadminDTO)
  }
  @Delete(":id")
  deleteuserById(@Param('id') id :number) : string{
    this.adminService.deleteQuryBuilder(id)
    return "OK,It's done."
  }
}