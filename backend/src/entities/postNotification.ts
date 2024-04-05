import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import User from "./user";
import Admin from "./admin";
import Post from "./post";

@Entity()
export default class PostNotification extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    content: string;

    @Column()
    date: Date;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Admin)
    admin: Admin;

    @ManyToOne(() => Post)
    post: Post;

}
