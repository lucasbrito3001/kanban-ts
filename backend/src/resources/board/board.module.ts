import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardMember } from '../board-member/entities/board-member.entity';
import { UtilsModule } from '@/utils/utils.module';
import { ListModule } from '../list/list.module';
import { BoardMemberModule } from '../board-member/board-member.module';
import { CardModule } from '../card/card.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, BoardMember]),
        UtilsModule,
        BoardMemberModule,
        ListModule,
        CardModule,
    ],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
