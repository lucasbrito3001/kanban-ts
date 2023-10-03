export type Token = string;

export interface ISessionService {
	createToken(payload: any): string;
	validateToken(token: string): any;
}