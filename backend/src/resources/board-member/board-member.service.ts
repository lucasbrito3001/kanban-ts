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

            const member = await this.boardMemberRepository.save({
                role: createBoardMemberDto.role,
                user: await this.userRepository.findOneBy({
                    id: userId,
                }),
                board: await this.boardRepository.findOneBy({
                    id: createBoardMemberDto.boardId,
                }),
            });

            return this.responseService.formatSuccess(member);
        } catch (error) {
            return this.responseService.formatError(
                ErrorTypes.UNEXPECTED_EXCEPTION,
                error,
            );
        }
    }

    async findByBoardId(
        boardId: string,
    ): Promise<ResponseFormat<BoardMember[]>> {
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

            return this.responseService.formatSuccess({
                id,
                ...updateBoardMemberDto,
            });
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
