import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpException,
    HttpStatus,
    UsePipes,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserDtoSchema } from './dto/update-user.dto';
import { SERVICE_ERRORS_DICT } from '@/constants';
import { LoggerService } from '@/utils/logger/logger.service';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { AuthUserDto, authUserDtoSchema } from './dto/auth-user.dto';
import { SchemaValidationPipe } from '@/pipes/schema/schema.pipe';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(new SchemaValidationPipe(createUserDtoSchema))
        createUserDto: CreateUserDto,
    ) {
        const { status, content, errorType, error } =
            await this.userService.create(createUserDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.CREATED, content };
    }

    @Post('auth')
    @UsePipes(new SchemaValidationPipe(authUserDtoSchema))
    @HttpCode(HttpStatus.OK)
    async login(@Body() authUserDto: AuthUserDto) {
        const { username, password } = authUserDto;

        const { status, content, errorType, error } =
            await this.userService.authenticate(username, password);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.userService.findOne(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new SchemaValidationPipe(updateUserDtoSchema))
        updateUserDto: UpdateUserDto,
    ) {
        const { status, content, errorType, error } =
            await this.userService.update(id, updateUserDto);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.userService.remove(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }
}
