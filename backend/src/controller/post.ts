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
    constructor(private readonly postService: PostService, private readonly userService: UserService) { }

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
    async getComments(@Request() req, @Param('id') id: number) {
        return this.postService.getComment(id)
    }

    @Get('search/:query')
    search(@Param('query') query: string) {
        console.log('Post Is :',query)
        return this.postService.search(query);
    }

    @Post('/approvePost/:id')
  async approvePost(@Param('id') id: number) {
    try {
      const approvedPost = await this.postService.approvePost(id);
      return { success: true, data: approvedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('/rejectPost/:id')
  async rejectPost(@Param('id') postId : number ) {
      await this.postService.rejectPost(postId);
      return { success: true, message: 'Post rejected and deleted' };
     
  }

    @UseGuards(AuthGuard)
    @Post(':id/comment')
    async addComment(@Request() req, @Param('id') id: number, @Body() comment: any) {

        // let user = req.user
        let user = req.user;
        return this.postService.addComment(id, user, comment)
    }

    @UseGuards(AuthGuard)
    @Put(':id/comment/:parent')
    async updateComment(@Param('id') id: number, @Param('parent') parent: number, @Param('user') user: User, @Body() update: UpdateCommentDTO) {
        const result = await this.postService.updateComment(update, parent, id, user);
        return { message: 'Comment updated successfully', result };
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() updatePostDTO: UpdatepostDTO,
        @Param('user') user: User
    ): Promise<PostEntity | ReviewMessage> {
        const result = await this.postService.update(id, updatePostDTO, user);

        if ('message' in result) {
            return { message: result.message };
        }
        return result as PostEntity;
    }

    @UseGuards(AuthGuard)
    @Post()
    async postCreat(@Request() req, @Body() createpostDTO: CreatepostDTO,): Promise<PostEntity | ReviewMessage> {
        //return this.postService.createPost(createpostDTO)
        let user = req.user;
        const result = await this.postService.createPost(createpostDTO, user);
        if ('message' in result) {
            return { message: result.message };
        }
        return result as PostEntity;
    }

    @Delete(":id")
    deletepostById(@Param('id') id: number): string {
        this.postService.DeleteQuryBuilder(id)
        return "Post delete successfully."
    }

    @Post(':id/like')
    async likePost(@Param('id') postId: number) {
        return this.postService.likePost(postId);
  }
}