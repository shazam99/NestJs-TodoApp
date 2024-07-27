import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('todo')
@ApiTags("ToDo")
@ApiSecurity("JWT-auth")
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post(":userId")
    @ApiOperation({ summary: 'Create a new todo' })
    @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
    @ApiBody({ type: CreateTodoDto })
    @ApiResponse({ status: 201, description: 'The todo has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Param("userId") userId: number) {
        return this.todoService.create(createTodoDto, userId);
    }

    @Get("/findAllNotCompleted/:userId")
    @ApiOperation({ summary: 'Get all not completed todos for a user' })
    @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Return all not completed todos.' })
    findAllNotCompleted(@Param("userId") userId: number) {
        return this.todoService.findAllTodosByUserNotCompleted(+userId);
    }

    @Get("/findAllCompleted/:userId")
    @ApiOperation({ summary: 'Get all completed todos for a user' })
    @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Return all completed todos.' })
    findAllCompleted(@Param("userId") userId: number) {
        return this.todoService.findAllTodosByUserCompleted(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Complete a todo' })
    @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
    @ApiResponse({ status: 200, description: 'The todo has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Todo not found.' })
    update(@Param('id') id: number) {
        return this.todoService.update(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a todo' })
    @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
    @ApiResponse({ status: 200, description: 'The todo has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Todo not found.' })
    remove(@Param('id') id: number) {
        return this.todoService.remove(+id);
    }
}