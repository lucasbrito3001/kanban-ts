import { Inject, Injectable } from '@nestjs/common';
import { ISessionService } from './session.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService implements ISessionService {
    constructor(
        private jwtService: JwtService
    ) {}

    createToken(payload: any): string {
        const token = this.jwtService.sign(payload);
        return token;
    }

    validateToken(token: string): any {
        const decoded = this.jwtService.verify(token);
        return decoded;
    }
}
