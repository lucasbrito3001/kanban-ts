import axios from "axios";

const api_gateway = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_GATEWAY,
	timeout: 2000,
});

export { api_gateway };
