import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { UserRoles } from 'src/utils/constants';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    create(createUserDto: CreateUserDto) {
        const user: User = new User();
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = createUserDto.password;
        user.role = UserRoles.NORMAL_USER_ROLE;
        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    findUserById(id: number) {
        return this.userRepository.findOneOrFail({ where: { id: id } });
    }

    findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}
