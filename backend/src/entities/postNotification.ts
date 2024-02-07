import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import User from "./user";
import Admin from "./admin";
import Post from "./post";

@Entity()
export default class PostNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    title: string;

    @Column()
    date: Date;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Admin)
    admin: Admin;

    @ManyToOne(() => Post)
    post: Post;

}
