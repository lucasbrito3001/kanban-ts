import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService, UserSelect } from './types/user.service.type';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponseService } from '@/utils/response/response.service';
import { ResponseFormat } from '@/utils/response/response.type';
import { SessionService } from '@/utils/session/session.service';
import { CryptoService } from '@/utils/crypto/crypto.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '@/utils/session/session.type';
import { ErrorTypes } from '@/constants';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private responseService: ResponseService,
        private sessionService: SessionService,
        private cryptoService: CryptoService,
    ) {}

    async create(
        createUserDto: CreateUserDto,
    ): Promise<ResponseFormat<UserSelect>> {
        try {
            const result = await this.userRepository.findOneBy({
                username: createUserDto.username,
            });

            if (result !== null)
                return this.responseService.formatError(
                    ErrorTypes.DUPLICATED_KEY,
                );

            const hashPassword = await this.cryptoService.createHash(
                createUserDto.password,
            );

            if (hashPassword === null)
                return this.responseService.formatError(ErrorTypes.HASH_ERROR);

            const { password, ...user } = await this.userRepository.save({
                ...createUserDto,
                password: hashPassword,
            });

            return this.responseService.formatSuccess(user);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async authenticate(
        username: string,
        password: string,
    ): Promise<ResponseFormat<Token>> {
        try {
            const user = await this.userRepository.findOne({
                where: { username },
                select: ['id', 'password'],
            });

            if (user === null)
                return this.responseService.formatError(
                    ErrorTypes.BAD_USERNAME,
                );

            const passwordsMatch = await this.cryptoService.compareHash(
                user.password,
                password,
            );

            if (!passwordsMatch)
                return this.responseService.formatError(
                    ErrorTypes.BAD_PASSWORD,
                );

            const token = this.sessionService.createToken({
                id: user.id,
                username,
            });

            return this.responseService.formatSuccess(token);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findOne(id: string): Promise<ResponseFormat<UserSelect>> {
        try {
            const user = await this.userRepository.findOneBy({ id });

            if (user === null)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(user);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseFormat<UserSelect>> {
        try {
            const { affected } = await this.userRepository.update(
                { id },
                updateUserDto,
            );

            if (affected === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const user = await this.userRepository.findOneBy({ id });

            return this.responseService.formatSuccess(user);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async remove(id: string): Promise<ResponseFormat<string>> {
        try {
            const { affected } = await this.userRepository.delete({ id });

            if (affected === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(id);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }
}
