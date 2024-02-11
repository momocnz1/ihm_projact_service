import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import PostService from '../service/post';
import PostEntity from '../entities/post';
import { CreatepostDTO, UpdateCommentDTO, UpdatepostDTO } from '../ihm/ihm.dto';
import UserService from '../service/user';
import User from '../entities/user';
import { AuthGuard } from 'src/auth/auth.guard';


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

    @UseGuards(AuthGuard)
    @Post(':id/comment')
    async addComment(@Request() req, @Param('id') id : number,@Body() comment: any ){
        
        // let user = req.user
        let user = req.user;
        return this.postService.addComment(id,user,comment)
    }

    @UseGuards(AuthGuard)
    @Put(':id/comment/:parent')
    async updateComment(@Param('id') id: number,@Param('parent') parent: number, @Body() update: UpdateCommentDTO) {
        
        const result = await this.postService.updateComment(update, parent,id);
        return { message: 'Comment updated successfully', result };
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() updatePostDTO: UpdatepostDTO
      ): Promise<PostEntity | ReviewMessage> {
        const result = await this.postService.update(id, updatePostDTO);
      
        if ('message' in result) {
          return { message: result.message };
        }
        return result as PostEntity;
      }

    @UseGuards(AuthGuard)
    @Post()
    async postCreat(@Request() req,@Body() createpostDTO: CreatepostDTO,): Promise<PostEntity | ReviewMessage> {
        //return this.postService.createPost(createpostDTO)
        let user = req.user;
        const result = await this.postService.createPost(createpostDTO, user);
        if ('message' in result) {
            return { message: result.message };
          }
          return result as PostEntity;
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    deletepostById(@Param('id') id: number): string {
        this.postService.DeleteQuryBuilder(id)
        return "Post delete successfully."
    }
    
    @UseGuards(AuthGuard)
    @Delete(":id/comment/:parent")
    deletecommetById(@Param('id') id: number,@Param('parent') parent: number): string {
        this.postService.DeleteComment(id,parent)
        return "Post delete successfully."
    }
}