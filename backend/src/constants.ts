import { HttpStatus } from '@nestjs/common';

type ErrorDict = {
    [id: string]: {
        httpStatusCode: number;
        message: string;
    };
};

export enum ErrorTypes {
    INVALID_DTO = 'INVALID_DTO',
    HASH_ERROR = 'HASH_ERROR',
    BAD_PASSWORD = 'BAD_PASSWORD',
    BAD_USERNAME = 'BAD_USERNAME',
    BAD_RELATIONSHIP = 'BAD_RELATIONSHIP',
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
    DUPLICATED_KEY = 'DUPLICATED_KEY',
    UNEXPECTED_EXCEPTION = 'UNEXPECTED_EXCEPTION',
    UNAUTHORIZED = 'UNAUTHORIZED',
}

export const SERVICE_ERRORS_DICT: ErrorDict = {
    INVALID_DTO: {
        httpStatusCode: HttpStatus.BAD_REQUEST,
        message: 'The sent request payload is invalid',
    },
    HASH_ERROR: {
        httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
            'We have an internal server error, please contact the administrator',
    },
    BAD_PASSWORD: {
        httpStatusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect username or password',
    },
    BAD_USERNAME: {
        httpStatusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect username or password',
    },
    RESOURCE_NOT_FOUND: {
        httpStatusCode: HttpStatus.BAD_REQUEST,
        message: 'The resource was not found',
    },
    DUPLICATED_KEY: {
        httpStatusCode: HttpStatus.BAD_REQUEST,
        message: 'Unique key duplicated',
    },
    UNEXPECTED_EXCEPTION: {
        httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
            'We have an internal server error, please contact the administrator',
    },
    UNAUTHORIZED: {
        httpStatusCode: HttpStatus.UNAUTHORIZED,
        message: 'The user is not authenticated',
    },
};

export const MOCK_UUID = '00000000-0000-0000-0000-000000000000'