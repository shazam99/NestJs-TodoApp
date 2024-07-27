import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [PassportModule, UsersModule, JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory : (configService:ConfigService) => ({
            secret: configService.get("JWT_KEY"),
            signOptions:{
                expiresIn: configService.get<string>("JWT_EXPIRES") + "s", //3600s
            }
        })
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule { }
