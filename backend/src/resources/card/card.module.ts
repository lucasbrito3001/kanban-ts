import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { List } from '../list/entities/list.entity';
import { UtilsModule } from '@/utils/utils.module';

@Module({
    imports: [TypeOrmModule.forFeature([Card, List]), UtilsModule],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
