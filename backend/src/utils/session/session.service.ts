import { Inject, Injectable } from '@nestjs/common';
import { ISessionService } from './session.type';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';

@Injectable()
export class SessionService implements ISessionService {
    constructor(
        @Inject('SESSION_SECRET_KEY')
        private secretKey: string,
        @Inject('SESSION_DURATION')
        private duration: number | string,
        @Inject('SIGN_TOKEN')
        private sign: (payload: any, secretKey: string, options: any) => string,
        @Inject('VERIFY_TOKEN')
        private verify: (token: any, secretKey: string) => any,
    ) {}

    createToken(payload: any): string {
        const token = this.sign(payload, this.secretKey, {
            expiresIn: this.duration,
        });
        return token;
    }

    validateToken(token: string): any {
        const decoded = this.verify(token, this.secretKey);
        return decoded;
    }
}
