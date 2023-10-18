import { AppModule } from '@/app.module';
import { BoardMemberModule } from '@/resources/board-member/board-member.module';
import { BoardModule } from '@/resources/board/board.module';
import { UserModule } from '@/resources/user/user.module';
import { UtilsModule } from '@/utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export const mockJwtSecret = 'mock_secret';

const jwtModuleOptions = {
    global: true,
    secret: mockJwtSecret,
    signOptions: {
        expiresIn: '1d',
    },
};

export const testingModuleBuilder: TestingModuleBuilder =
    Test.createTestingModule({
        imports: [
            UserModule,
            BoardModule,
            BoardMemberModule,
            UtilsModule,
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
                entities: [
                    join(
                        __dirname,
                        '../src/resources/**/entities/*.entity{.ts, .js}',
                    ),
                ],
                synchronize: true,
                logging: false,
            }),
            JwtModule.register(jwtModuleOptions),
        ],
        providers: [JwtService],
    });
