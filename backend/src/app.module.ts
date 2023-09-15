import { Module } from '@nestjs/common';
import { UserModule } from './resources/user/user.module';
import { BoardModule } from './resources/board/board.module';
import { BoardMemberModule } from './resources/board-member/board-member.module';
import { CryptoService } from './utils/crypto/crypto.service';
import { SessionService } from './utils/session/session.service';
import { ResponseService } from './utils/response/response.service';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [UserModule, BoardModule, BoardMemberModule, UtilsModule],
    controllers: [],
    providers: [CryptoService, SessionService, ResponseService],
})
export class AppModule {}
