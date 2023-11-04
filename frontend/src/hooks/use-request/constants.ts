export const requestsDict = {
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
	GET_BOARD: {
		url: "/board/:boardId?full=0",
		method: "GET",
	},
	GET_BOARD_CONTENT: {
		url: "/board/:boardId?full=1",
		method: "GET",
	},
	CREATE_CARD: {
		url: "/card",
		method: "POST",
	},
	CREATE_LIST: {
		url: "/list",
		method: "POST",
	},
};
