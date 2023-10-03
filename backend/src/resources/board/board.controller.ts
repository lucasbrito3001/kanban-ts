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

@Controller('board')
@UseGuards(AuthGuard)
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private readonly boardMemberService: BoardMemberService,
        private readonly errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    async create(
        @Body(new SchemaValidationPipe(createBoardDtoSchema))
        createBoardDto: CreateBoardDto,
    ) {
        const { status, content, errorType, error } =
            await this.boardService.create(createBoardDto);

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
        const { status, content, errorType, error } =
            await this.boardService.findOne(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Get(':id/members')
    async findMembers(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.boardMemberService.findByBoardId(id);

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
