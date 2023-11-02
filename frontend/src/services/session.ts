import { api_gateway } from "./api";

export const TOKEN_NAME = "SESSION_TOKEN";

export const storeToken = (token: string): void => {
	localStorage.setItem(TOKEN_NAME, token);
};

export const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_NAME);
};

export const deleteToken = (): void => {
	localStorage.removeItem(TOKEN_NAME);
};
