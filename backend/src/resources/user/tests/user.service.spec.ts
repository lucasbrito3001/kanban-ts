import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { USER_SERVICE_PROVIDERS } from './constants/service.const';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: USER_SERVICE_PROVIDERS,
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
