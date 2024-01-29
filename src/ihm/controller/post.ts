import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request } from '@nestjs/common';
import PostService from '../service/post';
import PostEntity from '../entities/post';
import { CreatepostDTO, UpdatepostDTO } from '../ihm.dto';
import UserService from '../service/user';

@Controller('post')
export default class PostController {
    constructor(private readonly postService: PostService, private readonly userService : UserService) { }

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
        let user = await this.userService.findOne(1)
        return this.postService.addComment(id,user,comment)
    }

    @Put(':id')
    updateAdmin(@Param('id') id: number, @Body() updatePostDTO: UpdatepostDTO): Promise<PostEntity> {
        return this.postService.update(id, updatePostDTO);
    }

    @Post()
    postCreat(@Body() createpostDTO: CreatepostDTO): Promise<PostEntity> {
        return this.postService.createPost(createpostDTO)
    }

    @Delete(":id")
    deleteuserById(@Param('id') id: number): string {
        this.postService.DeleteQuryBuilder(id)
        return "OK,It's done."
    }
}