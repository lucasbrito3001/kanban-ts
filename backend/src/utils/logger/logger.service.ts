import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    constructor(private logger: Logger) {}

    public logError(errorType: string, message: string): void {
        this.logger.error(`[${errorType}] ${message}`);
    }
}
