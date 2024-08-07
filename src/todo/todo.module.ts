import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repo/todo.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
    controllers: [TodoController],
    providers: [TodoService, TodoRepository],
})
export class TodoModule { }
