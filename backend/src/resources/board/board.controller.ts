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

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const board = await this.boardService.findOne(id);

        if (!board.status)
            return this.errorHandlerService.throwError(
                board.errorType,
                board.error,
            );

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

        return {
            statusCode: HttpStatus.OK,
            content: {
                ...board.content,
                lists: lists.content,
                members: members.content,
                cards: cards.content,
            },
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
