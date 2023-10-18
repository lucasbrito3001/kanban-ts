import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { BoardMemberService } from './board-member.service';
import {
    CreateBoardMemberDto,
    createBoardMemberDtoSchema,
} from './dto/create-board-member.dto';
import {
    UpdateBoardMemberDto,
    updateBoardMemberDtoSchema,
} from './dto/update-board-member.dto';
import { SchemaValidationPipe } from '@/pipes/schema/schema.pipe';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { JwtPayload } from '@/decorator/jwt-payload/jwt-payload.decorator';
import { JwtPayload as JwtLibPayload } from 'jsonwebtoken';
import { AuthGuard } from '@/guards/auth/auth.guard';

@Controller('member')
@UseGuards(AuthGuard)
export class BoardMemberController {
    constructor(
        private readonly boardMemberService: BoardMemberService,
        private readonly errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    async create(
        @Body(new SchemaValidationPipe(createBoardMemberDtoSchema))
        createBoardDto: CreateBoardMemberDto,
        @JwtPayload() jwtPayload: JwtLibPayload,
    ) {
        const { status, content, errorType, error } =
            await this.boardMemberService.create(jwtPayload.id, createBoardDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.CREATED, content };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new SchemaValidationPipe(updateBoardMemberDtoSchema))
        updateBoardMemberDto: UpdateBoardMemberDto,
    ) {
        const { status, content, errorType, error } =
            await this.boardMemberService.update(id, updateBoardMemberDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.boardMemberService.remove(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }
}
