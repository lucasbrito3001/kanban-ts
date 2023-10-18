import { Module } from '@nestjs/common';
import { BoardMemberService } from './board-member.service';
import { BoardMemberController } from './board-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMember } from './entities/board-member.entity';
import { UtilsModule } from '@/utils/utils.module';
import { User } from '../user/entities/user.entity';
import { Board } from '../board/entities/board.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Board, BoardMember]),
        UtilsModule,
    ],
    controllers: [BoardMemberController],
    providers: [BoardMemberService],
    exports: [BoardMemberService],
})
export class BoardMemberModule {}
