import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpStatus,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';

@Controller('card')
export class CardController {
    constructor(
        private readonly cardService: CardService,
        private readonly errorHandlerService: ErrorHandlerService,
    ) {}

    @Post()
    async create(@Body() createCardDto: CreateCardDto) {
        const { status, content, errorType, error } =
            await this.cardService.create(createCardDto);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.CREATED, content };
    }

    // @Post('suggestions')
    // createSuggestionsAI(@Body('prompt') prompt: string) {
    //     return prompt;
    // }

    // @Get()
    // findAll() {
    //   return this.cardService.findAll();
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cardService.findOne(+id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCardDto: UpdateCardDto,
    ) {
        const { status, content, errorType, error } =
            await this.cardService.update(id, updateCardDto);

        if (!status)
            return this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { status, content, errorType, error } =
            await this.cardService.remove(id);

        if (!status) this.errorHandlerService.throwError(errorType, error);

        return { statusCode: HttpStatus.OK, content };
    }
}
