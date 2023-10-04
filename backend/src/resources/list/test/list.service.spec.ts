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
        Object.keys(mockRepository).forEach((key) => {
            mockRepository[key].mockRestore();
        });
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spySave = jest.spyOn(mockRepository, 'save');

            spySave.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_LIST_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should create a list successfully', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            const spySave = jest.spyOn(mockRepository, 'save');

            spyFindOneBy.mockResolvedValueOnce(null);
            spySave.mockResolvedValueOnce({ mock: 'mock' });

            const result = await service.create(MOCK_CREATE_LIST_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: { mock: 'mock' },
            });
        });
    });

    describe('findByBoard', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyFindBy = jest.spyOn(mockRepository, 'findBy');
            spyFindBy.mockRejectedValueOnce('error');

            const result = await service.findByBoard(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when lists length equals 0', async () => {
            const spyFindBy = jest.spyOn(mockRepository, 'findBy');

            spyFindBy.mockResolvedValueOnce([]);

            const result = await service.findByBoard(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should read lists successfully', async () => {
            const spyFindBy = jest.spyOn(mockRepository, 'findBy');

            spyFindBy.mockResolvedValueOnce([{ mock: 'mock' }]);

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
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockRejectedValueOnce('error');

            const result = await service.update(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_LIST_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 lists', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_LIST_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update list successfully', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            const list = {
                ...MOCK_CREATE_LIST_DTO,
                id: MOCK_UUID,
            };

            spyUpdate.mockResolvedValueOnce({ affected: 1 });
            spyFindOneBy.mockResolvedValueOnce(list);

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
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockRejectedValueOnce('error');

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 lists', async () => {
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should delete a list successfully', async () => {
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockResolvedValueOnce({ affected: 1 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: true,
                content: 'id',
            });
        });
    });
});
