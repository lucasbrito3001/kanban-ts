import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { UtilsModule } from '@/utils/utils.module';

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: jest.fn(),
                }
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
