import axios from "axios";
import { toast } from "react-toastify";

const api_gateway = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_GATEWAY,
	timeout: 2000,
});

api_gateway.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response &&
			[401, 403].includes(error.response.status) &&
			!error.request.responseURL.includes("/user/auth")
		) {
			toast("Unauthenticated user, you will be redirected to login screen...", {
				type: "error",
			});

			window.location.href = "/user/sign-in";
		} else return Promise.reject(error);
	}
);

export { api_gateway };
