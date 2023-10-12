import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from '../list.service';
import { mockRepository } from '@/mocks';
import { ResponseService } from '@/utils/response/response.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from '../entities/list.entity';
import { MOCK_CREATE_LIST_DTO } from '../dto/create-list.dto';
import { ErrorTypes, MOCK_UUID } from '@/constants';
import { Board } from '@/resources/board/entities/board.entity';

describe('ListService', () => {
    let service: ListService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListService,
                ResponseService,
                {
                    provide: getRepositoryToken(List),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(Board),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ListService>(ListService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.save.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_LIST_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.UNEXPECTED_EXCEPTION,
                error: 'error',
            });
        });

        it('should return BAD_RELATIONSHIP when the board not exists', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce(null);

            const result = await service.create(MOCK_CREATE_LIST_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.BAD_RELATIONSHIP,
                error: undefined,
            });
        });

        it('should create a list successfully', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce({});
            mockRepository.save.mockResolvedValueOnce({ mock: 'mock' });

            const result = await service.create(MOCK_CREATE_LIST_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: { mock: 'mock' },
            });
        });
    });

    describe('findByBoard', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.findBy.mockRejectedValueOnce('error');

            const result = await service.findByBoard(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.UNEXPECTED_EXCEPTION,
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when lists length equals 0', async () => {
            mockRepository.findBy.mockResolvedValueOnce([]);

            const result = await service.findByBoard(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.RESOURCE_NOT_FOUND,
                error: undefined,
            });
        });

        it('should read lists successfully', async () => {
            mockRepository.findBy.mockResolvedValueOnce([{ mock: 'mock' }]);

            const result = await service.findByBoard(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: true,
                content: [{ mock: 'mock' }],
            });
        });
    });

    describe('update', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.update.mockRejectedValueOnce('error');

            const result = await service.update(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_LIST_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.UNEXPECTED_EXCEPTION,
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 lists', async () => {
            mockRepository.update.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_LIST_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.RESOURCE_NOT_FOUND,
                error: undefined,
            });
        });

        it('should update list successfully', async () => {
            const list = {
                ...MOCK_CREATE_LIST_DTO,
                id: MOCK_UUID,
            };

            mockRepository.update.mockResolvedValueOnce({ affected: 1 });
            mockRepository.findOneBy.mockResolvedValueOnce(list);

            const result = await service.update(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_LIST_DTO,
            );

            expect(result).toStrictEqual({
                status: true,
                content: list,
            });
        });
    });

    describe('delete', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.delete.mockRejectedValueOnce('error');

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.UNEXPECTED_EXCEPTION,
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 lists', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.RESOURCE_NOT_FOUND,
                error: undefined,
            });
        });

        it('should delete a list successfully', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 1 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: true,
                content: 'id',
            });
        });
    });
});
