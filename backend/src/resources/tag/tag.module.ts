import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { UtilsModule } from '@/utils/utils.module';
import { Board } from '../board/entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, Tag]), UtilsModule],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
