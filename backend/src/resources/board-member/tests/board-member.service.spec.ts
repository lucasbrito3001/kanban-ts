import { Test, TestingModule } from '@nestjs/testing';
import { BoardMemberService } from '../board-member.service';
import { mockRepository } from '@/mocks';
import { ResponseService } from '@/utils/response/response.service';
import { Board } from '@/resources/board/entities/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardMember } from '../entities/board-member.entity';
import { User } from '@/resources/user/entities/user.entity';
import { MOCK_CREATE_MEMBER_DTO } from '../dto/create-board-member.dto';

describe('BoardMemberService', () => {
    let service: BoardMemberService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardMemberService,
                ResponseService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
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

        service = module.get<BoardMemberService>(BoardMemberService);
    });

    afterEach(() => {
        Object.keys(mockRepository).forEach((key) => {
            mockRepository[key].mockRestore();
        });
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockRejectedValueOnce('error');

            const result = await service.create(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_MEMBER_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return DUPLICATED_KEY when try to create a user that already exists', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockResolvedValueOnce({} as Board);

            const result = await service.create(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_MEMBER_DTO,
            );

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

            const result = await service.create(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_MEMBER_DTO,
            );

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

        it('should return RESOURCE_NOT_FOUND when have no members in the board', async () => {
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

        it('should read board members successfully', async () => {
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

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 boards', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update a board successfully', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyUpdate.mockResolvedValueOnce({ affected: 1 });
            spyFindOneBy.mockResolvedValueOnce({});

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

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
