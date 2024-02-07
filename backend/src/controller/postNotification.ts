import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import PostNotificationService from '../service/postNotification'
import PostNotification from '../entities/postNotification';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import CreatePostNotification from '../ihm/ihm.dto';
import UserService from 'src/service/user';

@Controller('postNotification')
export default class PostNotificationController {
  constructor(private readonly postNotificationService: PostNotificationService,private userService : UserService) {}

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
  @Post('sendNotificationToUser')
  async sendNotificationToUser(@Body() data: any) {
    const { userId, message } = data;
    const user = await this.userService.findById(userId);
    if (user) {
      await this.postNotificationService.sendNotificationToUser(user, message);
      return { success: true };
    }
    return { success: false, message: 'User not found' };
  }

  @Post('sendDeletionNotificationToUser')
  async sendDeletionNotificationToUser(@Body() data: any) {
    const { userId, postId } = data;
    const user = await this.userService.findById(userId);
    if (user) {
      //await this.postNotificationService.sendDeletionNotificationToUser(user, postId);
      return { success: true };
    }
    return { success: false, message: 'User not found' };
  }
}