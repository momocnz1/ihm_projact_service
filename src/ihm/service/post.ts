import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from '../entities/post';
import { CreatepostDTO, UpdatepostDTO } from '../ihm.dto';
import User from '../entities/user';

//แก้รึป่าว
@Injectable()
export default class PostService {
    getComment(id: number) {
        return this.postRepository.find({
            where : {
                parent : {
                    id : id
                }
            }
        })
    }

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }
    getstatus(): string {
        return "OK";
    }
    findAll(): Promise<Post[]> {
        return this.postRepository.find({
            where: {
                parent: null
            }
        });
    }
    findOne(id: number): Promise<Post | null> {
        return this.postRepository.findOneBy({ id: id });
    }

    async addComment(id: number, user : User, commentDTO: any) {
        let p = Post.create({
        
            ...commentDTO,
            date: new Date(),
            parent : await this.findOne(id),
            user : user
        })
        
        
        return p.save()
    }

    async createPost(createPostDTO: CreatepostDTO): Promise<Post> {
        const newPost = this.postRepository.create({
            ...createPostDTO,
            date: new Date(),
        });
        return await this.postRepository.save(newPost);
    }
    async update(id: number, update: UpdatepostDTO): Promise<Post | null> {
        const postToUpdate = await this.postRepository.findOne({ where: { id: id } });

        if (!postToUpdate) {
            throw new NotFoundException('Post not found');
        }
        postToUpdate.title = update.title;
        postToUpdate.content = update.content;

        return await this.postRepository.save(postToUpdate);
    }

    async DeleteQuryBuilder(id: number): Promise<void> {
        await this.postRepository.delete({ id: id })
    }
}
