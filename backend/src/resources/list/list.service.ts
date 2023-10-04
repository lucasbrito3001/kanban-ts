import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '@/utils/response/response.service';
import { ErrorTypes } from '@/constants';
import { ResponseFormat } from '@/utils/response/response.type';
import { Board } from '../board/entities/board.entity';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        private responseService: ResponseService,
    ) {}

    async create(createListDto: CreateListDto): Promise<ResponseFormat<List>> {
        try {
            const { name, position } = createListDto;
            const board = await this.boardRepository.findOneBy({
                id: createListDto.boardId,
            });

            const list = await this.listRepository.save({
                name,
                position,
                board,
            });

            return this.responseService.formatSuccess(list);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByBoard(boardId: string): Promise<ResponseFormat<List[]>> {
        try {
            const cards = await this.listRepository.findBy({
                board: { id: boardId },
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

    async update(
        id: string,
        updateListDto: UpdateListDto,
    ): Promise<ResponseFormat<List>> {
        try {
            const { affected } = await this.listRepository.update(
                id,
                updateListDto,
            );

            if (affected === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const list = await this.listRepository.findOneBy({ id });

            return this.responseService.formatSuccess(list);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async remove(id: string): Promise<ResponseFormat<string>> {
        try {
            const { affected } = await this.listRepository.delete({
                id,
            });

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
