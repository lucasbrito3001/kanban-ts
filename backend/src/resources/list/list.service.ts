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

            if (board === null)
                return this.responseService.formatError(
                    ErrorTypes.BAD_RELATIONSHIP,
                );

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
            const lists = await this.listRepository.findBy({
                board: { id: boardId },
            });

            if (lists.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(lists);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async countByBoard(boardId: string): Promise<ResponseFormat<number>> {
        try {
            const countLists = await this.listRepository.countBy({
                id: boardId,
            });

            return this.responseService.formatSuccess(countLists);
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
