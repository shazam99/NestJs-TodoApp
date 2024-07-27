import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserRoles } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/signUp")
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(new RoleGuard(UserRoles.ADMIN_ROLE))
    @ApiSecurity("JWT-auth")
    findAll() {
        return this.usersService.findAll();
    }

    @Delete(':id')
    @UseGuards(new RoleGuard(UserRoles.ADMIN_ROLE))
    @ApiSecurity("JWT-auth")
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
