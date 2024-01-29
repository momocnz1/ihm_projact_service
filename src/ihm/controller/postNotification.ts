import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import PostNotificationService from '../service/postNotification'
import PostNotification from '../entities/postNotification';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import CreatePostNotification from '../ihm.dto';

@Controller('postNotification')
export default class PostNotificationController {
  constructor(private readonly postNotificationService: PostNotificationService) {}

  @Get('status')
  getStatus() : string{
    return this.postNotificationService.getstatus();
  }
  @Get()
  getIndex(@Req() request : Request): Promise<PostNotification[]> {
    return this.postNotificationService.findAll();
  }
  @Get(':id')
    getByid(@Param('id') id : number) : Promise<PostNotification>{
        return this.postNotificationService.findOne(id)
    }
  @Delete(":id")
  deleteuserById(@Param('id') id :number) : string{
    this.postNotificationService.DeleteQuryBuilder(id)
    return "OK,It's done."
  }
  
  @Roles(Role.Admin)
  @Post('onlyadmin')
  onlyAdminCreat(@Body() createPostNotification :CreatePostNotification ):Promise<PostNotification>{
    return this.postNotificationService.create(createPostNotification)
  }
}