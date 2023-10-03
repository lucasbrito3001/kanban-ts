import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import {
    MOCK_CREATE_USER_DTO,
    createUserDtoSchema,
} from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { ResponseService } from '@/utils/response/response.service';
import { SessionService } from '@/utils/session/session.service';
import { CryptoService } from '@/utils/crypto/crypto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MOCK_AUTH_USER_DTO, authUserDtoSchema } from '../dto/auth-user.dto';
import { updateUserDtoSchema } from '../dto/update-user.dto';
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

    describe('create', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyFindOneBy.mockRejectedValueOnce('error');

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return DUPLICATED_KEY', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            spyFindOneBy.mockResolvedValueOnce({} as User);

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'DUPLICATED_KEY',
                error: undefined,
            });
        });

        it('should return HASH_ERROR', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            const spyCreateHash = jest.spyOn(mockCrypto, 'createHash');

            spyFindOneBy.mockResolvedValueOnce(null);
            spyCreateHash.mockReturnValueOnce(null);

            const result = await service.create(MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'HASH_ERROR',
                error: undefined,
            });
        });

        it('should create a user succesfully', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');
            const spySave = jest.spyOn(mockRepository, 'save');
            const spyCreateHash = jest.spyOn(mockCrypto, 'createHash');

            spyFindOneBy.mockResolvedValueOnce(null);
            spyCreateHash.mockReturnValueOnce('hash');
            spySave.mockResolvedValue(MOCK_CREATE_USER_DTO);

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
            const spyFindOne = jest.spyOn(mockRepository, 'findOne');

            spyFindOne.mockRejectedValueOnce('error');

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
            const spyFindOne = jest.spyOn(mockRepository, 'findOne');

            spyFindOne.mockResolvedValueOnce(null);

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
            const spyFindOne = jest.spyOn(mockRepository, 'findOne');
            const spyCompareHash = jest.spyOn(mockCrypto, 'compareHash');

            spyFindOne.mockResolvedValueOnce({});
            spyCompareHash.mockReturnValueOnce(false);

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
            const spyFindOne = jest.spyOn(mockRepository, 'findOne');
            const spyCompareHash = jest.spyOn(mockCrypto, 'compareHash');
            const spyCreateToken = jest.spyOn(mockSession, 'createToken');

            spyFindOne.mockResolvedValueOnce({});
            spyCompareHash.mockReturnValueOnce(true);
            spyCreateToken.mockReturnValueOnce('token');

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
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyFindOneBy.mockRejectedValueOnce('error');

            const result = await service.findOne('');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyFindOneBy.mockResolvedValueOnce(null);

            const result = await service.findOne('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should find user successfully', async () => {
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyFindOneBy.mockResolvedValueOnce({});

            const result = await service.findOne('id');

            expect(result).toStrictEqual({
                status: true,
                content: {},
            });
        });
    });

    describe('update', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockRejectedValueOnce('error');

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');

            spyUpdate.mockResolvedValueOnce({ affected: 0 });

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should update a user succesfully', async () => {
            const spyUpdate = jest.spyOn(mockRepository, 'update');
            const spyFindOneBy = jest.spyOn(mockRepository, 'findOneBy');

            spyUpdate.mockResolvedValueOnce({ affected: 1 });
            spyFindOneBy.mockResolvedValueOnce({});

            const result = await service.update('id', MOCK_CREATE_USER_DTO);

            expect(result).toStrictEqual({
                status: true,
                content: {},
            });
        });
    });

    describe('delete', () => {
        it('should return UNEXPECTED_EXCEPTION', async () => {
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockRejectedValueOnce('error');

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'UNEXPECTED_EXCEPTION',
                error: 'error',
            });
        });

        it('should return RESOURCE_NOT_FOUND', async () => {
            const spyDelete = jest.spyOn(mockRepository, 'delete');

            spyDelete.mockResolvedValueOnce({ affected: 0 });

            const result = await service.remove('id');

            expect(result).toStrictEqual({
                status: false,
                errorType: 'RESOURCE_NOT_FOUND',
                error: undefined,
            });
        });

        it('should delete user successfully', async () => {
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
