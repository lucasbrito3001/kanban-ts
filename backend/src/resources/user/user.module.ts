import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { createUserDtoSchema } from './dto/create-user.dto';
import { UtilsModule } from '@/utils/utils.module';
import { updateUserDtoSchema } from './dto/update-user.dto';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { authUserDtoSchema } from './dto/auth-user.dto';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UtilsModule],
    controllers: [UserController],
    providers: [
        UserService,
        ErrorHandlerService
    ],
})
export class UserModule {}
