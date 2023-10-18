import { TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testingModuleBuilder } from '../test.module';
import { ErrorTypes, SERVICE_ERRORS_DICT } from '@/constants';
import { MOCK_CREATE_BOARD_DTO } from '@/resources/board/dto/create-board.dto';

describe('BoardController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule =
            await testingModuleBuilder.compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/board (POST)', () => {
        it('should create a board successfully', async () => {
            const response = await request(app.getHttpServer())
                .post('/board')
                .send(MOCK_CREATE_BOARD_DTO)
                .expect(HttpStatus.CREATED);

            expect(response.body).toMatchObject({
                statusCode: HttpStatus.CREATED,
                content: MOCK_CREATE_BOARD_DTO,
            });
        });

        it('should return INVALID_DTO error', async () => {
            const { httpStatusCode, message } =
                SERVICE_ERRORS_DICT[ErrorTypes.INVALID_DTO];

            const response = await request(app.getHttpServer())
                .post('/board')
                .send({ name: MOCK_CREATE_BOARD_DTO.name })
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
                .post('/board')
                .send(MOCK_CREATE_BOARD_DTO);

            const response = await request(app.getHttpServer())
                .post('/board')
                .send(MOCK_CREATE_BOARD_DTO)
                .expect(httpStatusCode);

            expect(response.body).toMatchObject({
                statusCode: httpStatusCode,
                errorCode: ErrorTypes.DUPLICATED_KEY,
                description: message,
            });
        });
    });

    // describe('/board/:id')
});
