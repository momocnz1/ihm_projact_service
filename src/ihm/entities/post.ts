import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm"
import User from "./user";


@Entity()
export default class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable:true})
    title: string;

    @Column()
    date: Date;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Post, (post) => post.parent)
    comments: Post[];

    @ManyToOne(()=> Post, (post) => post.comments)
    parent : Post


}