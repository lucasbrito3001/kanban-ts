import { SERVICE_ERRORS_DICT } from '@/constants';
import { HttpException, Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ErrorHandlerService {
    constructor(private loggerService: LoggerService) {}

    throwError(errorType: string, error?: any): void {
        const { message, httpStatusCode } = SERVICE_ERRORS_DICT[errorType];

        this.loggerService.logError(errorType, error ? '' + error : message);

        throw new HttpException(
            {
                statusCode: httpStatusCode,
                errorCode: errorType,
                description: message,
            },
            httpStatusCode,
        );
    }
}
