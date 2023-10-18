import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
    let service: SessionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SessionService,
                {
                    provide: 'SESSION_SECRET_KEY',
                    useValue: 'secret_key',
                },
            ],
        }).compile();

        service = module.get<SessionService>(SessionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
