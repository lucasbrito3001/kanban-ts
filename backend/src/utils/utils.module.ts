import 'dotenv/config';

import { Logger, Module } from '@nestjs/common';
import { SessionService } from './session/session.service';
import { CryptoService } from './crypto/crypto.service';
import { ResponseService } from './response/response.service';
import { compare, hash } from 'bcrypt';
import { LoggerService } from './logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { AiService } from './ai/ai.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [
        SessionService,
        CryptoService,
        ResponseService,
        ErrorHandlerService,
        LoggerService,
        AiService,
        Logger,
        {
            provide: 'HASH_ROUNDS',
            useValue: process.env.HASH_ROUNDS,
        },
        {
            provide: 'HASH_FUNCTION',
            useValue: hash,
        },
        {
            provide: 'COMPARE_FUNCTION',
            useValue: compare,
        },
    ],
    exports: [
        SessionService,
        CryptoService,
        ResponseService,
        LoggerService,
        ErrorHandlerService,
        AiService,
    ],
})
export class UtilsModule {}
