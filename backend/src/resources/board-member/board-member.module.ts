import { Module } from '@nestjs/common';
import { BoardMemberService } from './board-member.service';
import { BoardMemberController } from './board-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMember } from './entities/board-member.entity';
import { ResponseService } from '@/utils/response/response.service';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { UtilsModule } from '@/utils/utils.module';
import { User } from '../user/entities/user.entity';
import { Board } from '../board/entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Board, BoardMember]), UtilsModule],
    controllers: [BoardMemberController],
    providers: [BoardMemberService, ResponseService, ErrorHandlerService],
})
export class BoardMemberModule {}
