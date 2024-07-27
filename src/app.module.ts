import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('POSTGRES_URL'),
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get<boolean>('DATABASE_SYNC'),
                logging: configService.get<boolean>('DATABASE_LOGGING'),
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
        }),
        UsersModule,
        TodoModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
