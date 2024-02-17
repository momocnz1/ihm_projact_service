import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req } from '@nestjs/common';
import PostNotificationService from '../service/postNotification'
import PostNotification from '../entities/postNotification';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CreatePostNotification } from 'src/ihm/ihm.dto';
import UserService from 'src/service/user';
import PostService from 'src/service/post';


@Controller('Notification')
export default class PostNotificationController {
  constructor(private readonly postNotificationService: PostNotificationService,
    private userService : UserService,
    private postService : PostService
    ) {}

  @Get('status')
  getStatus() : string{
    return this.postNotificationService.getstatus();
  }
  // @Get()
  // getIndex(@Req() request : Request): Promise<PostNotification[]> {
  //   return this.postNotificationService.findAll();
  // }
  @Get(':id')
    getByid(@Param('id') id : number) : Promise<PostNotification>{
        return this.postNotificationService.findOne(id)
    }

  @Get('/admin/Notification')
  async getAdminNotifications(): Promise<PostNotification[]>  {
    console.log('ok we go')
    return this.postNotificationService.getAdminNotifications();
  }
  @Get('/admin/Notification/:id')
  async getAdminNotification(@Param('id')  id:number): Promise<PostNotification[]>  {
    console.log('ok we go')
    return this.postNotificationService.getAdminNotificationByID(id);
  }

  @Get('user/Notificatio')
  getuser(): Promise<PostNotification[]>{
    console.log('ok this is Notification For user all')
    return this.postNotificationService.getNotificationsForUser()
  } 
  @Get('/user/Notification/:id')
  getuserByid(@Param('id') id : number) : Promise<PostNotification[]>{
    console.log('ok we goc')  
    return this.postNotificationService.getNotificationforUserById(id)
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
  
  @Post()
  notificationCreat(@Body() create : CreatePostNotification): Promise<PostNotification>{
    
    console.log(create)
    return this.postNotificationService.create(create)
  }

  @Post('sendNotificationToUser')
  async sendNotificationToUser(@Body() data: any) {
    const { userId, message , postId} = data;
    const user = await this.userService.findById(userId);
    const post = await this.postService.findOne(postId);
    if (user) {
      await this.postNotificationService.sendNotificationToUser(user,message,post);
      await this.postNotificationService.sendNotificationToPostUser(userId, postId, message);
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