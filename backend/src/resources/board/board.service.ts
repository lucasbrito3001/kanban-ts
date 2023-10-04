import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ResponseService } from '@/utils/response/response.service';
import { BoardMember } from '../board-member/entities/board-member.entity';
import { ResponseFormat } from '@/utils/response/response.type';
import { InjectRepository } from '@nestjs/typeorm';
import { IBoardService } from './types/board.service.type';
import { ErrorTypes } from '@/constants';

@Injectable()
export class BoardService implements IBoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        @InjectRepository(BoardMember)
        private readonly boardMemberRepository: Repository<BoardMember>,
        private readonly responseService: ResponseService,
    ) {}

    async create(
        createBoardDto: CreateBoardDto,
    ): Promise<ResponseFormat<Board>> {
        try {
            const foundBoard = await this.boardRepository.findOneBy({
                name: createBoardDto.name,
            });

            if (foundBoard !== null)
                return this.responseService.formatError(
                    ErrorTypes.DUPLICATED_KEY,
                );

            const board = await this.boardRepository.save(createBoardDto);

            return this.responseService.formatSuccess(board);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByUser(userId: string): Promise<ResponseFormat<Board[]>> {
        try {
            const boards = await this.boardMemberRepository.find({
                where: { user: { id: userId } },
                relations: ['board'],
            });

            if (boards.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(boards);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findOne(id: string): Promise<ResponseFormat<Board>> {
        try {
            const board = await this.boardRepository.findOneBy({ id });

            if (board === null)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(board);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async update(
        id: string,
        updateBoardDto: UpdateBoardDto,
    ): Promise<ResponseFormat<Board>> {
        try {
            const { affected } = await this.boardRepository.update(
                { id },
                updateBoardDto,
            );

            if (affected === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const board = await this.boardRepository.findOneBy({ id });

            return this.responseService.formatSuccess(board);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async remove(id: string): Promise<ResponseFormat<string>> {
        try {
            const { affected } = await this.boardRepository.delete({ id });

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
