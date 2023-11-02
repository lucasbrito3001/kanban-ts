import { AxiosRequestConfig, Method } from "axios";

export type requests =
	| "CREATE_USER"
	| "AUTH_USER"
	| "CREATE_BOARD"
	| "GET_BOARDS";

type requestInfos = {
	[key: string]: {
		url: string;
		method: Method;
	};
};

export const requestsDict: requestInfos = {
	CREATE_USER: {
		url: "/user",
		method: "POST",
	},
	AUTH_USER: {
		url: "/user/auth",
		method: "POST",
	},
	CREATE_BOARD: {
		url: "/board",
		method: "POST",
	},
	GET_BOARDS: {
		url: "/board",
		method: "GET",
	},
};
