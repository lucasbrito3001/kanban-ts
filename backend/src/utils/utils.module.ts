import { Module } from '@nestjs/common';
import { SessionService } from './session/session.service';
import { CryptoService } from './crypto/crypto.service';
import { ResponseService } from './response/response.service';

@Module({
    providers: [SessionService, CryptoService, ResponseService],
})
export class UtilsModule {}
