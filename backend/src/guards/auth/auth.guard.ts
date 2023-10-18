import { ErrorTypes, SERVICE_ERRORS_DICT } from '@/constants';
import { ErrorHandlerService } from '@/utils/error-handler/error-handler.service';
import { ResponseService } from '@/utils/response/response.service';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private errorHandlerService: ErrorHandlerService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const { httpStatusCode, message } =
            SERVICE_ERRORS_DICT[ErrorTypes.UNAUTHORIZED];

        if (!token) {
            this.errorHandlerService.throwError(
                ErrorTypes.UNAUTHORIZED,
                'Invalid token',
            );
            return false;
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,
            });

            request['jwtPayload'] = payload;
        } catch {
            this.errorHandlerService.throwError(
                ErrorTypes.UNAUTHORIZED,
                'Internal error to verify token',
            );
            return false;
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
