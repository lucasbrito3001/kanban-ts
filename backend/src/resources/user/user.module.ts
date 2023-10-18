import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UtilsModule } from '@/utils/utils.module';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UtilsModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
