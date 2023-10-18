import { ErrorTypes } from '@/constants';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { LoggerService } from '@/utils/logger/logger.service';
import {
    ArgumentMetadata,
    Injectable,
    Logger,
    PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
    private readonly errorHandlerService: ErrorHandlerService =
        new ErrorHandlerService(new LoggerService(new Logger()));

    constructor(private readonly schema: ObjectSchema) {}

    transform(dto: any, metadata: ArgumentMetadata) {
        const { error, value } = this.schema.validate(dto);

        if (error)
            return this.errorHandlerService.throwError(
                ErrorTypes.INVALID_DTO,
                error,
            );

        return value;
    }
}
