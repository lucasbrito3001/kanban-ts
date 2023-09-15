import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
    let service: ResponseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ResponseService],
        }).compile();

        service = module.get<ResponseService>(ResponseService);
    });

    it('should return status and content', () => {
        const response = service.formatSuccess('mock content');
        expect(response).toEqual({ status: true, content: 'mock content' });
    });

    it('should return status and error', () => {
        const response = service.formatError({ foo: 'bar' });
        expect(response).toEqual({ status: false, error: { foo: 'bar' } });
    });
});
