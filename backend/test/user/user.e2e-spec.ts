import { TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testingModuleBuilder } from '../test.module';
import { MOCK_CREATE_USER_DTO } from '@/resources/user/dto/create-user.dto';
import { ErrorTypes, SERVICE_ERRORS_DICT } from '@/constants';
import { MOCK_AUTH_USER_DTO } from '@/resources/user/dto/auth-user.dto';

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule =
            await testingModuleBuilder.compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/user (POST)', () => {
        it('should create user successfully', async () => {
            const { password, ...user } = MOCK_CREATE_USER_DTO;

            const response = await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO)
                .expect(201);

            expect(response.body.content).toMatchObject(user);
        });

        it('should return INVALID_DTO error', async () => {
            const { password, ...user } = MOCK_CREATE_USER_DTO;
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.INVALID_DTO];

            const response = await request(app.getHttpServer())
                .post('/user')
                .send(user)
                .expect(httpStatusCode);

            expect(response.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.INVALID_DTO,
                description: message,
            });
        });

        it('should return DUPLICATED_KEY error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.DUPLICATED_KEY];

            await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const response = await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO)
                .expect(httpStatusCode);

            expect(response.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.DUPLICATED_KEY,
                description: message,
            });
        });
    });

    describe('/user/auth (POST)', () => {
        it('should authenticate successfully', async () => {
            await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const response = await request(app.getHttpServer())
                .post('/user/auth')
                .send(MOCK_AUTH_USER_DTO)
                .expect(200);

            expect(response.body.content).toBeDefined();
        });

        it('should return BAD_USERNAME error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.BAD_USERNAME];

            const response = await request(app.getHttpServer())
                .post('/user/auth')
                .send(MOCK_AUTH_USER_DTO)
                .expect(httpStatusCode);

            expect(response.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.BAD_USERNAME,
                description: message,
            });
        });

        it('should return BAD_PASSWORD error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.BAD_PASSWORD];

            await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const response = await request(app.getHttpServer())
                .post('/user/auth')
                .send({
                    username: MOCK_AUTH_USER_DTO.username,
                    password: 'BAD_PASS',
                })
                .expect(httpStatusCode);

            expect(response.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.BAD_PASSWORD,
                description: message,
            });
        });
    });

    describe('/user/:id (GET)', () => {
        it('should get user successfully', async () => {
            const { password, ...user } = MOCK_CREATE_USER_DTO;

            const createdUser = await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const result = await request(app.getHttpServer())
                .get(`/user/${createdUser.body.content.id}`)
                .expect(HttpStatus.OK);

            expect(result.body.content).toMatchObject({
                ...user,
                id: createdUser.body.content.id,
            });
        });

        it('should return RESOURCE_NOT_FOUND error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.RESOURCE_NOT_FOUND];

            const result = await request(app.getHttpServer())
                .get(`/user/00000000-0000-0000-0000-000000000000`)
                .expect(httpStatusCode);

            expect(result.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.RESOURCE_NOT_FOUND,
                description: message,
            });
        });
    });

    describe('/user/:id (PUT)', () => {
        it('should update user successfully', async () => {
            const { password, ...user } = MOCK_CREATE_USER_DTO;

            const createdUser = await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const result = await request(app.getHttpServer())
                .put(`/user/${createdUser.body.content.id}`)
                .send({ ...MOCK_CREATE_USER_DTO, username: 'updated' })
                .expect(HttpStatus.OK);

            expect(result.body.content).toMatchObject({
                ...user,
                username: 'updated',
                id: createdUser.body.content.id,
            });
        });

        it('should return INVALID_DTO error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.INVALID_DTO];

            const result = await request(app.getHttpServer())
                .put(`/user/00000000-0000-0000-0000-000000000000`)
                .send({ ...MOCK_CREATE_USER_DTO, username: 123 })
                .expect(httpStatusCode);

            expect(result.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.INVALID_DTO,
                description: message,
            });
        });

        it('should return RESOURCE_NOT_FOUND error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.RESOURCE_NOT_FOUND];

            const result = await request(app.getHttpServer())
                .put(`/user/00000000-0000-0000-0000-000000000000`)
                .send({ ...MOCK_CREATE_USER_DTO, username: 'updated' })
                .expect(httpStatusCode);

            expect(result.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.RESOURCE_NOT_FOUND,
                description: message,
            });
        });
    });

    describe('/user/:id (DELETE)', () => {
        it('should delete a user successfully', async () => {
            const { password, ...user } = MOCK_CREATE_USER_DTO;

            const createdUser = await request(app.getHttpServer())
                .post('/user')
                .send(MOCK_CREATE_USER_DTO);

            const result = await request(app.getHttpServer())
                .delete(`/user/${createdUser.body.content.id}`)
                .expect(HttpStatus.OK);

            expect(result.body.content).toBe(createdUser.body.content.id);
        });

        it('should return RESOURCE_NOT_FOUND error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.RESOURCE_NOT_FOUND];

            const result = await request(app.getHttpServer())
                .delete(`/user/00000000-0000-0000-0000-000000000000`)
                .expect(httpStatusCode);

            expect(result.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.RESOURCE_NOT_FOUND,
                description: message,
            });
        });
    });
});
