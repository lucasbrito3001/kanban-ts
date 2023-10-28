import { api_gateway } from "./api";

const storeToken = (token: string): void => {
	localStorage.setItem("SESSION_TOKEN", token);
	api_gateway.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const deleteToken = () => {
	localStorage.getItem("SESSION_TOKEN");
};

export { storeToken, deleteToken };
