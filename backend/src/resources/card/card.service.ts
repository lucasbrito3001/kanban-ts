import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { In, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '@/utils/response/response.service';
import { ErrorTypes } from '@/constants';
import { List } from '../list/entities/list.entity';
import { ResponseFormat } from '@/utils/response/response.type';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        private readonly responseService: ResponseService,
    ) {}

    async create(createCardDto: CreateCardDto): Promise<ResponseFormat<Card>> {
        try {
            const { listId, ...dto } = createCardDto;

            const list = await this.listRepository.findOneBy({
                id: createCardDto.listId,
            });

            if (list === null)
                return this.responseService.formatError(
                    ErrorTypes.BAD_RELATIONSHIP,
                );

            const card = await this.cardRepository.save({
                ...dto,
                list,
            });

            return this.responseService.formatSuccess(card);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByBoard(boardId: string): Promise<ResponseFormat<Card[]>> {
        try {
            const cards = await this.cardRepository.find({
                where: { list: { board: { id: boardId } } },
                relations: ['list'],
            });

            if (cards.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(cards);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByList(listId: string): Promise<ResponseFormat<Card[]>> {
        try {
            const cards = await this.cardRepository.find({
                where: { list: { id: listId } },
                relations: {
                    tags: true,
                },
            });

            if (cards.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(cards);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} card`;
    }

    async update(
        id: string,
        updateCardDto: UpdateCardDto,
    ): Promise<ResponseFormat<Card>> {
        try {
            const { tagIds, ...cardDto } = updateCardDto;
            let card: Card = await this.cardRepository.findOneBy({ id });

            if (card === null)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const tags: Tag[] = await this.tagRepository.findBy({
                id: In<string>(updateCardDto.tagIds),
            });

            card = { ...card, ...cardDto, tags };

            this.cardRepository.save(card);

            return this.responseService.formatSuccess(card);
        } catch (error) {
            console.log(error);
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async addTags(cardId: string, tagIds: string[]) {
        try {
            const card = await this.cardRepository.findOne({
                where: {
                    id: cardId,
                },
                relations: {
                    tags: true,
                },
            });

            if (card === null)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const tags = await this.tagRepository.findBy({
                id: In<string>(tagIds),
            });

            card.tags = tags;

            await this.cardRepository.save(card);

            return this.responseService.formatSuccess(card);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async remove(id: string): Promise<ResponseFormat<string>> {
        try {
            const { affected } = await this.cardRepository.delete({ id });

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
