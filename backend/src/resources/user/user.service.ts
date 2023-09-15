import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService, Token } from './types/user-service.type';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponseService } from '@/utils/response/response.service';
import { ResponseFormat } from '@/utils/response/response.type';
import { SessionService } from '@/utils/session/session.service';
import { CryptoService } from '@/utils/crypto/crypto.service';
import * as Joi from 'joi';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private responseService: ResponseService,
        private sessionService: SessionService,
        private cryptoService: CryptoService,
        @Inject('CREATE_USER_SCHEMA_DTO')
        private createUserDtoSchema: Joi.ObjectSchema,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<ResponseFormat> {
        try {
            const { error, value } =
                this.createUserDtoSchema.validate(createUserDto);

            if (error)
                return this.responseService.formatError('invalid DTO schema');

            const hashPassword = await this.cryptoService.createHash(
                value.password,
            );

            if (hashPassword === null)
                return this.responseService.formatError('password dont match');

            const user = await this.userRepository.save({
                ...value,
                password: hashPassword,
            });

            return this.responseService.formatSuccess(user);
        } catch (error) {
            return this.responseService.formatError(error);
        }
    }

    async authenticate(
        username: string,
        password: string,
    ): Promise<ResponseFormat> {
        try {
            const user = await this.userRepository.findOne({
                where: { username },
                select: ['id', 'password'],
            });

            if (user === null)
                return this.responseService.formatError('username not found');

            const passwordsMatch = await this.cryptoService.compareHash(
                user.password,
                password,
            );

            if (!passwordsMatch)
                return this.responseService.formatError('passwords dont match');

            const token = this.sessionService.createToken({
                id: user.id,
                username,
            });

            return this.responseService.formatSuccess(token);
        } catch (error) {
            return this.responseService.formatError(error);
        }
    }

    async findAll(): Promise<ResponseFormat<Omit<User, 'password'>[]>> {
        try {
        } catch (error) {
            return this.responseService.formatError(error);
        }
    }

    async findOne(id: string): Promise<ResponseFormat<Omit<User, 'password'>>> {
        try {
        } catch (error) {}
        return `This action returns a #${id} user`;
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
}
