import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request } from '@nestjs/common';
import PostService from '../service/post';
import PostEntity from '../entities/post';
import { CreatepostDTO, UpdateCommentDTO, UpdatepostDTO } from '../ihm/ihm.dto';
import UserService from '../service/user';
import User from '../entities/user';


type ReviewMessage = {
    message: string;
};

@Controller('post')
export default class PostController {
    constructor(private readonly postService: PostService, private readonly userService : UserService ) { }

    @Get('status')
    getStatus(): string {
        return this.postService.getstatus();
    }

    @Get()
    getIndex(@Req() request: Request): Promise<PostEntity[]> {
        return this.postService.findAll();
    }

    @Get(':id')
    getByid(@Param('id') id: number): Promise<PostEntity> {
        return this.postService.findOne(id)
    }
    
    @Get(':id/comment')
    async getComments(@Request() req, @Param('id') id : number){
        return this.postService.getComment(id)
    }


    @Post(':id/comment')
    async addComment(@Request() req, @Param('id') id : number,@Body() comment: any ){
        
        // let user = req.user
        let user = req.user;
        return this.postService.addComment(id,user,comment)
    }
    @Put(':id/comment/:parent')
    async updateComment(@Param('id') id: number,@Param('parent') parent: number, @Body() update: UpdateCommentDTO) {
        const result = await this.postService.updateComment(update, parent,id);
        return { message: 'Comment updated successfully', result };
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() updatePostDTO: UpdatepostDTO
      ): Promise<PostEntity | ReviewMessage> {
        const result = await this.postService.update(id, updatePostDTO);
      
        if ('message' in result) {
          // กรณีมี ReviewMessage แสดงว่ามีปัญหาเช่นคำหยาบ
          // ทำการ return ReviewMessage หรือปรับเป็นการตอบกลับที่เหมาะสม
          return { message: result.message };
        }
      
        // กรณีไม่มี ReviewMessage แสดงว่าไม่มีปัญหา
        // ให้คืนค่า PostEntity ได้เลย
        return result as PostEntity;
      }

    @Post()
    async postCreat(@Body() createpostDTO: CreatepostDTO, user : User ): Promise<PostEntity | ReviewMessage> {
        //return this.postService.createPost(createpostDTO)
        const result = await this.postService.createPost(createpostDTO, user);
        if ('message' in result) {
            // กรณีมี ReviewMessage แสดงว่ามีคำหยาบ
            // ทำการ return ReviewMessage หรือปรับเป็นการตอบกลับที่เหมาะสม
            return { message: result.message };
          }
        
          // กรณีไม่มี ReviewMessage แสดงว่าไม่มีคำหยาบ
          // ให้คืนค่า PostEntity ได้เลย
          return result as PostEntity;
    }

    @Delete(":id")
    deletepostById(@Param('id') id: number): string {
        this.postService.DeleteQuryBuilder(id)
        return "Post delete successfully."
    }
    
}