import { ResponseFormat } from '@/utils/response/response.type';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Token } from '@/utils/session/session.type';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<ResponseFormat<UserSelect>>;
    authenticate(
        username: string,
        password: string,
    ): Promise<ResponseFormat<Token>>;
    findOne(id: string): Promise<ResponseFormat<UserSelect>>;
    update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseFormat<UserSelect>>;
    remove(id: string): Promise<ResponseFormat<string>>;
}

export type UserSelect = Omit<User, 'password'>;
