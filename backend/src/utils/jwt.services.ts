export interface Jwt {
	createToken(payload: any): string;
	decodeToken(token: string): any;
}

export class JwtService implements Jwt {
	constructor(
		private secretKey: string,
		private duration: number | string,
		private sign: (payload: any, secretKey: string, options: any) => string,
		private verify: (token: any, secretKey: string) => any
	) {}

	createToken(payload: any): string {
		const token = this.sign(payload, this.secretKey, {
			expiresIn: this.duration,
		});
		return token;
	}

	decodeToken(token: string): any {
		const decoded = this.verify(token, this.secretKey);
		return decoded;
	}
}
