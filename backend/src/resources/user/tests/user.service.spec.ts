import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { MOCK_CREATE_USER_DTO } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { ResponseService } from '@/utils/response/response.service';
import { SessionService } from '@/utils/session/session.service';
import { CryptoService } from '@/utils/crypto/crypto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MOCK_AUTH_USER_DTO } from '../dto/auth-user.dto';
import { mockCrypto, mockRepository, mockSession } from '@/mocks';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                ResponseService,
                {
                    provide: CryptoService,
                    useValue: mockCrypto,
                },
                {
                    provide: SessionService,
                    useValue: mockSession,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    afterEach(() => {
        Object.keys(mockRepository).forEach((key) => {
            mockRepository[key].mockRestore();
        });
    });

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            mockRepository.findOneBy.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return DUPLICATED_KEY', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce({} as User);

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'DUPLICATED_KEY',
                error: undefined,
            });
        });

        it('should return HASH_ERROR', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce(null);
            mockCrypto.createHash.mockReturnValueOnce(null);

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'HASH_ERROR',
                error: undefined,
            });
        });

        it('should create a user succesfully', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce(null);
            mockCrypto.createHash.mockReturnValueOnce('hash');
            mockRepository.save.mockResolvedValue(MOCK_CREATE_USER_DTO);

            const result = await service.create(MOCK_CREATE_USER_DTO);

            const { password, ...userWithoutPassword } = MOCK_CREATE_USER_DTO;

            expect(result).toStrictEqual({
                status: true,
                content: userWithoutPassword,
            });
        });
    });

    describe('authenticate', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            mockRepository.findOne.mockRejectedValueOnce('error');

            const result = await service.authenticate(
                MOCK_AUTH_USER_DTO.username,
                MOCK_AUTH_USER_DTO.password,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return BAD_USERNAME', async () => {
            mockRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.authenticate(
                MOCK_AUTH_USER_DTO.username,
                MOCK_AUTH_USER_DTO.password,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'BAD_USERNAME',
                error: undefined,
            });
        });

        it('should return BAD_PASSWORD', async () => {
            mockRepository.findOne.mockResolvedValueOnce({});
            mockCrypto.compareHash.mockReturnValueOnce(false);

            const result = await service.authenticate(
                MOCK_AUTH_USER_DTO.username,
                MOCK_AUTH_USER_DTO.password,
            );

            expect(result).toStrictEqual({
                status: false,
                errorType: 'BAD_PASSWORD',
                error: undefined,
            });
        });

        it('should auth user successfully', async () => {
            mockRepository.findOne.mockResolvedValueOnce({});
            mockCrypto.compareHash.mockReturnValueOnce(true);
            mockSession.createToken.mockReturnValueOnce('token');

            const result = await service.authenticate(
                MOCK_AUTH_USER_DTO.username,
                MOCK_AUTH_USER_DTO.password,
            );

            expect(result).toStrictEqual({
                status: true,
                content: 'token',
            });
        });
    });

    describe('findOne', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            mockRepository.findOneBy.mockRejectedValueOnce('error');

            const result = await service.findOne('');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce(null);

            const result = await service.findOne('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should find user successfully', async () => {
            mockRepository.findOneBy.mockResolvedValueOnce({});

            const result = await service.findOne('id');

            expect(result).toStrictEqual({
                status: true,
                content: {},
            });
        });
    });

    describe('update', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            mockRepository.update.mockRejectedValueOnce('error');

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            mockRepository.update.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update a user succesfully', async () => {
            mockRepository.update.mockResolvedValueOnce({ affected: 1 });
            mockRepository.findOneBy.mockResolvedValueOnce({});

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: {},
            });
        });
    });

    describe('delete', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            mockRepository.delete.mockRejectedValueOnce('error');

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should delete user successfully', async () => {
            mockRepository.delete.mockResolvedValueOnce({ affected: 1 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: true,
                content: 'id',
            });
        });
    });
});
