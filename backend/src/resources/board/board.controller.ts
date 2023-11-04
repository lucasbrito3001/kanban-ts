import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    Put,
    UseGuards,
    Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, createBoardDtoSchema } from './dto/create-board.dto';
import { UpdateBoardDto, updateBoardDtoSchema } from './dto/update-board.dto';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { SchemaValidationPipe } from '@/pipes/schema/schema.pipe';
import { BoardMemberService } from '../board-member/board-member.service';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { JwtPayload } from '@/decorator/jwt-payload/jwt-payload.decorator';
import { JwtPayload as JwtLibPayload } from 'jsonwebtoken';
import { ListService } from '../list/list.service';
import { CardService } from '../card/card.service';
import { Board } from './entities/board.entity';
import { GetBoardContent } from './types/board.service.type';

@Controller('board')
@UseGuards(AuthGuard)
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private readonly boardMemberService: BoardMemberService,
        private readonly listService: ListService,
        private readonly cardService: CardService,
        private readonly errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    async create(
        @JwtPayload() jwtPayload: JwtLibPayload,
        @Body(new SchemaValidationPipe(createBoardDtoSchema))
        createBoardDto: CreateBoardDto,
    ) {
        const { status, content, errorType, error } =
            await this.boardService.create(jwtPayload.id, createBoardDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.CREATED, content };
    }

    @Get()
    async findAll(@JwtPayload() jwtPayload: JwtLibPayload) {
        const { status, content, error, errorType } =
            await this.boardService.findByUser(jwtPayload.id);

        const promises = content.map(async (board) => {
            const lists = await this.listService.countByBoard(board.id);
            const members = await this.boardMemberService.countByBoard(
                board.id,
            );

            if (!lists.status || !members.status)
                throw new Error('Error to get lists and members quantities');

            return {
                ...board,
                quantityMembers: members.content,
                quantityLists: lists.content,
            };
        });

        const boardsInfos = await Promise.all(promises);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content: boardsInfos };
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Query('full') full: string) {
        const board = await this.boardService.findOne(id);
        let contentToReturn: GetBoardContent = board.content;

        if (!board.status)
            return this.errorHandlerService.throwError(
                board.errorType,
                board.error,
            );

        if (+full === 1) {
            const [members, lists, cards] = await Promise.all([
                this.boardMemberService.findByBoard(board.content.id),
                this.listService.findByBoard(board.content.id),
                this.cardService.findByBoard(board.content.id),
            ]);

            if ((!members.status || !lists.status || !cards.status) === null)
                return this.errorHandlerService.throwError(
                    members.errorType || lists.errorType || cards.errorType,
                    members.error || lists.error || cards.error,
                );

            contentToReturn = {
                ...contentToReturn,
                members: members.content || [],
                lists: lists.content || [],
                cards: cards.content || [],
            };
        }

        return {
            statusCode: HttpStatus.OK,
            content: contentToReturn,
        };
    }

    @Get(':id/member')
    async findMembers(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.boardMemberService.findByBoard(id);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Get(':id/list')
    async findLists(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.listService.findByBoard(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new SchemaValidationPipe(updateBoardDtoSchema))
        updateUserDto: UpdateBoardDto,
    ) {
        const { status, content, errorType, error } =
            await this.boardService.update(id, updateUserDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.boardService.remove(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }
}
