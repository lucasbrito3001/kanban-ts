import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '@/utils/response/response.service';
import { ErrorTypes } from '@/constants';
import { ResponseFormat } from '@/utils/response/response.type';
import { Board } from '../board/entities/board.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly responseService: ResponseService,
    ) {}

    async create(createTagDto: CreateTagDto): Promise<ResponseFormat<Tag>> {
        try {
            const { boardId, ...tagDto } = createTagDto;

            const foundTag = await this.tagRepository.findOneBy({
                name: createTagDto.name,
            });

            if (foundTag !== null)
                return this.responseService.formatError(
                    ErrorTypes.DUPLICATED_KEY,
                );

            const board = await this.boardRepository.findOneBy({
                id: boardId,
            });

            if (board === null)
                return this.responseService.formatError(
                    ErrorTypes.BAD_RELATIONSHIP,
                );

            console.log({
                ...tagDto,
                board,
            });

            const tag = await this.tagRepository.save({
                ...tagDto,
                board,
            });

            return this.responseService.formatSuccess(tag);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByBoard(boardId: string) {
        try {
            const tags = await this.tagRepository.findBy({
                board: { id: boardId },
            });

            if (tags.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(tags);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    findAll() {
        return `This action returns all tag`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
