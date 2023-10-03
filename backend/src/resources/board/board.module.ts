import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardMember } from '../board-member/entities/board-member.entity';
import { UtilsModule } from '@/utils/utils.module';
import { BoardMemberService } from '../board-member/board-member.service';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Board, BoardMember]), UtilsModule],
    controllers: [BoardController],
    providers: [BoardService, BoardMemberService],
})
export class BoardModule {}
