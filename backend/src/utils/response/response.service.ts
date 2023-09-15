import { Injectable } from '@nestjs/common';
import { IResponseService, ResponseFormat } from './response.type';

@Injectable()
export class ResponseService implements IResponseService {
    formatSuccess(content: any): ResponseFormat {
        return { status: true, content };
    }

    formatError(error: any): ResponseFormat {
        return { status: false, error };
    }
}
