import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from '../board.service';
import { MOCK_CREATE_BOARD_DTO } from '../dto/create-board.dto';
import { mockRepository } from '@/mocks';
import { Board } from '../entities/board.entity';
import { ResponseService } from '@/utils/response/response.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardMember } from '@/resources/board-member/entities/board-member.entity';

describe('BoardService', () => {
    let service: BoardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                ResponseService,
                {
                    provide: getRepositoryToken(Board),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(BoardMember),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<BoardService>(BoardService);
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return DUPLICATED_KEY when try to create a user that already exists', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockResolvedValueOnce({} as Board);

            const result = await service.create(MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'DUPLICATED_KEY',
                error: undefined,
            });
        });

        it('should create board successfully', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            const spySave = jest.spyOn(mockRepository, 'save');

            spyFindOneBy.mockResolvedValueOnce(null);
            spySave.mockResolvedValueOnce({ mock: 'mock' });

            const result = await service.create(MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: { mock: 'mock' },
            });
        });
    });

    describe('findByUser', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyFind = jest.spyOn(mockRepository, 'find');
            spyFind.mockRejectedValueOnce('error');

            const result = await service.findByUser(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when boards length equals 0', async () => {
            const spyFind = jest.spyOn(mockRepository, 'find');

            spyFind.mockResolvedValueOnce([]);

            const result = await service.findByUser(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should read boards successfully', async () => {
            const spyFind = jest.spyOn(mockRepository, 'find');

            spyFind.mockResolvedValueOnce([{ mock: 'mock' }]);

            const result = await service.findByUser(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: true,
                content: [{ mock: 'mock' }],
            });
        });
    });

    describe('findOne', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockRejectedValueOnce('error');

            const result = await service.findOne(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when board search equals null', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockResolvedValueOnce(null);

            const result = await service.findOne(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should read board successfully', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyFindOneBy.mockResolvedValueOnce({ mock: 'mock' });

            const result = await service.findOne(
                '00000000-0000-0000-0000-000000000000',
            );

            expect(result).toStrictEqual({
                status: true,
                content: { mock: 'mock' },
            });
        });
    });

    describe('update', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockRejectedValueOnce('error');

            const result = await service.update('id', MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 boards', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update('id', MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update a board succesfully', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyUpdate.mockResolvedValueOnce({ affected: 1 });
            spyFindOneBy.mockResolvedValueOnce({});

            const result = await service.update('id', MOCK_CREATE_BOARD_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: {},
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

        it('should return RESOURCE_NOT_FOUND when affect 0 boards', async () => {
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should delete a board successfully', async () => {
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
