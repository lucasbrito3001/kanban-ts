import { Injectable } from '@nestjs/common';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UpdateBoardMemberDto } from './dto/update-board-member.dto';
import { Repository } from 'typeorm';
import { BoardMember } from './entities/board-member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '@/utils/response/response.service';
import { ResponseFormat } from '@/utils/response/response.type';
import { ErrorTypes } from '@/constants';
import { User } from '../user/entities/user.entity';
import { Board } from '../board/entities/board.entity';

@Injectable()
export class BoardMemberService {
    constructor(
        @InjectRepository(BoardMember)
        private readonly boardMemberRepository: Repository<BoardMember>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly responseService: ResponseService,
    ) {}

    async create(
        userId: string,
        createBoardMemberDto: CreateBoardMemberDto,
    ): Promise<ResponseFormat<BoardMember>> {
        try {
            const foundBoardMember = await this.boardMemberRepository.findOneBy(
                {
                    user: {
                        id: userId,
                    },
                    board: {
                        id: createBoardMemberDto.boardId,
                    },
                },
            );

            if (foundBoardMember !== null)
                return this.responseService.formatError(
                    ErrorTypes.DUPLICATED_KEY,
                );

            const user = await this.userRepository.findOneBy({
                id: userId,
            });

            const board = await this.boardRepository.findOneBy({
                id: createBoardMemberDto.boardId,
            });

            if (user === null || board === null)
                return this.responseService.formatError(
                    ErrorTypes.BAD_RELATIONSHIP,
                );

            const member = await this.boardMemberRepository.save({
                role: createBoardMemberDto.role,
                user,
                board,
            });

            return this.responseService.formatSuccess(member);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByBoard(boardId: string): Promise<ResponseFormat<BoardMember[]>> {
        try {
            const boardMembers = await this.boardMemberRepository.findBy({
                board: {
                    id: boardId,
                },
            });

            if (boardMembers.length === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            return this.responseService.formatSuccess(boardMembers);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async countByBoard(boardId: string): Promise<ResponseFormat<number>> {
        try {
            const countMembers = await this.boardMemberRepository.countBy({
                id: boardId,
            });

            return this.responseService.formatSuccess(countMembers);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async update(
        id: string,
        updateBoardMemberDto: UpdateBoardMemberDto,
    ): Promise<ResponseFormat<BoardMember>> {
        try {
            const { affected } = await this.boardMemberRepository.update(
                { id },
                updateBoardMemberDto,
            );

            if (affected === 0)
                return this.responseService.formatError(
                    ErrorTypes.RESOURCE_NOT_FOUND,
                );

            const member = await this.boardMemberRepository.findOneBy({ id });

            return this.responseService.formatSuccess(member);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async remove(id: string): Promise<ResponseFormat<string>> {
        try {
            const { affected } = await this.boardMemberRepository.delete({
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
