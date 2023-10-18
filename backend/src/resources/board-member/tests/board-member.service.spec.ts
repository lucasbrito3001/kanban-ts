import { Test, TestingModule } from '@nestjs/testing';
import { BoardMemberService } from '../board-member.service';
import { mockRepository } from '@/mocks';
import { ResponseService } from '@/utils/response/response.service';
import { Board } from '@/resources/board/entities/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardMember } from '../entities/board-member.entity';
import { User } from '@/resources/user/entities/user.entity';
import { MOCK_CREATE_MEMBER_DTO } from '../dto/create-board-member.dto';
import { ErrorTypes } from '@/constants';

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
        jest.restoreAllMocks();
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.findOneBy.mockRejectedValueOnce('error');

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
            mockRepository.findOneBy.mockResolvedValueOnce({} as Board);

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

        it('should return BAD_RELATIONSHIP when the user or board not exists', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const result = await service.create(
                '00000000-0000-0000-0000-000000000000',
                MOCK_CREATE_MEMBER_DTO,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: ErrorTypes.BAD_RELATIONSHIP,
                error: undefined,
            });
        });

        it('should create board successfully', async () => {
            mockRepository.findOneBy
                .mockResolvedValue({})
                .mockResolvedValueOnce(null);
            mockRepository.save.mockResolvedValueOnce({ mock: 'mock' });

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
            mockRepository.findBy.mockRejectedValueOnce('error');

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
            mockRepository.findBy.mockResolvedValueOnce([]);

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

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 boards', async () => {
            mockRepository.update.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update a board successfully', async () => {
            mockRepository.update.mockResolvedValueOnce({ affected: 1 });
            mockRepository.findOneBy.mockResolvedValueOnce({});

            const result = await service.update('id', MOCK_CREATE_MEMBER_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: {},
            });
        });
    });

    describe('delete', () => {
        it('should return UNEXPECTED_EXCEPTION when throw any unhandled error', async () => {
            mockRepository.delete.mockRejectedValueOnce('error');

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND when affect 0 boards', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should delete a board successfully', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 1 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: true,
                content: 'id',
            });
        });
    });
});
