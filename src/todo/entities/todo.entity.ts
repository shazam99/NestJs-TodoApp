import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    completed: boolean;

    // many todos has one user
    @ManyToOne(()=>User, (user)=>user.todos)
    user: User;
}
