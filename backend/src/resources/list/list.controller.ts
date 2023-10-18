import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';

@Controller('list')
export class ListController {
    constructor(
        private readonly listService: ListService,
        private errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    async create(@Body() createListDto: CreateListDto) {
        const { status, content, error, errorType } =
            await this.listService.create(createListDto);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.CREATED, content };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateListDto: UpdateListDto,
    ) {
        const { status, content, error, errorType } =
            await this.listService.update(id, updateListDto);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.listService.remove(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }
}
