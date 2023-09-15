import { ResponseFormat } from '@/utils/response/response.type';
import { CreateUserDto } from '../dto/create-user.dto';

export type Token = string;

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<ResponseFormat>;
    authenticate(username: string, password: string): Promise<ResponseFormat>;
}