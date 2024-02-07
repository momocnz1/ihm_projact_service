import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm"
import User from "./user";


@Entity()
export default class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    date: Date;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Post, (post) => post.parent)
    comments: Post[];

    @ManyToOne(()=> Post, (post) => post.comments)
    parent : Post


}