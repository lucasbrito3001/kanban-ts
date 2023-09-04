import { sign, verify } from "jsonwebtoken"

export interface Jwt {
    createToken(payload: any): string
    decodeToken(token: string): any
}

export class JwtService implements Jwt {
    constructor(
        private secretKey: string,
        private duration: number | string
    ) { }

    createToken(payload: any): string {
        const token = sign(payload, this.secretKey, { expiresIn: this.duration })
        return token
    }

    decodeToken(token: string): any {
        const decoded = verify(token, this.secretKey)
        return decoded
    }
}