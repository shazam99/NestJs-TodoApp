import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private jwtservice: JwtService) { }

    @Post("/login")
    @UseGuards(AuthGuard("local"))
    @ApiTags("Login")
    login(@Req() request, @Body() loginDto:LoginDto) {
        const user: User = request.user;
        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        }
        return { token: this.jwtservice.sign(payload) };
    }

}
