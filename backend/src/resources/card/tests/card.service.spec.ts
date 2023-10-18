import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../card.service';
import { mockRepository } from '@/mocks';
import { MOCK_CREATE_CARD_DTO } from '../dto/create-card.dto';
import { ErrorTypes } from '@/constants';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { List } from '@/resources/list/entities/list.entity';
import { ResponseService } from '@/utils/response/response.service';

describe('CardService', () => {
    let service: CardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardService,
                ResponseService,
                { provide: getRepositoryToken(Card), useValue: mockRepository },
                { provide: getRepositoryToken(List), useValue: mockRepository },
            ],
        }).compile();

        service = module.get<CardService>(CardService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.findOneBy.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_CARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.UNEXPECTED_EXCEPTION,
                error: 'error',
            });
        });

        it('should return BAD_RELATIONSHIP when the list not exists', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce(null);

            const result = await service.create(MOCK_CREATE_CARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.BAD_RELATIONSHIP,
                error: undefined,
            });
        });

        it('should create a card successfully', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce({});
            mockRepository.save.mockResolvedValueOnce({});

            const result = await service.create(MOCK_CREATE_CARD_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: {}
            });
        });
    });

    describe('', () => {
        
    })
});
