import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { UtilsModule } from '@/utils/utils.module';
import { Board } from '../board/entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([List, Board]), UtilsModule],
    controllers: [ListController],
    providers: [ListService],
    exports: [ListService],
})
export class ListModule {}
