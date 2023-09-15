import { mockRepository } from "@/mocks/repository.mock";
import { createUserDtoSchema } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ResponseService } from "@/utils/response/response.service";
import { SessionService } from "@/utils/session/session.service";
import { CryptoService } from "@/utils/crypto/crypto.service";
import { UserService } from "../../user.service";

export const USER_SERVICE_PROVIDERS = [
    UserService,
    CryptoService,
    SessionService,
    ResponseService,
    {
        provide: getRepositoryToken(User),
        useValue: mockRepository,
    },
    {
        provide: 'SESSION_SECRET_KEY',
        useValue: 'secret_key',
    },
    {
        provide: 'SESSION_DURATION',
        useValue: '1d',
    },
    {
        provide: 'VERIFY_TOKEN',
        useValue: jest.fn(),
    },
    {
        provide: 'SIGN_TOKEN',
        useValue: jest.fn(),
    },
    {
        provide: 'CREATE_USER_SCHEMA_DTO',
        useValue: createUserDtoSchema,
    },
    {
        provide: 'HASH_ROUNDS',
        useValue: 1,
    },
    {
        provide: 'HASH_FUNCTION',
        useValue: jest.fn(),
    },
    {
        provide: 'COMPARE_FUNCTION',
        useValue: jest.fn(),
    },
];
