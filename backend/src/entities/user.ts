import { Entity, PrimaryGeneratedColumn, Column,  OneToMany } from "typeorm"
import PostNotification from "./postNotification";
import { IsAlphanumeric, IsNumberString,  Length, Matches, validate } from "class-validator";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password : string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column("blob", { nullable: true })
    profileImage: string;  

    @Column({ nullable: true })
    roles: string; 
    
    @OneToMany(() => PostNotification, (notification) => notification.user,{ onDelete: 'CASCADE' })
    notifications: PostNotification[];

}