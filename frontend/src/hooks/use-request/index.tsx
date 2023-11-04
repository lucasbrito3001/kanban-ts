import { api_gateway } from "@/services/api";
import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { requestsDict } from "./constants";
import { getToken } from "@/services/session";

type generalReturn<T, K> = [
	boolean,
	T | null,
	K,
	(
		requestOptions: AxiosRequestConfig,
		params?: { [key: string]: string }
	) => Promise<void>
];

export const useRequest = <T, K>(
	type: keyof typeof requestsDict
): generalReturn<T, K> => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [errors, setErrors] = useState<any>(null);

	let { url, method } = requestsDict[type];

	const execute = async (
		requestOptions: AxiosRequestConfig,
		params?: { [key: string]: string }
	) => {
		if (params !== undefined) {
			Object.entries(params).forEach(([key, value]) => {
				url = url.replace(`:${key}`, value);
			});
		}

		const token = getToken();

		setErrors(null);
		setData(null);
		setIsLoading(true);

		try {
			const response = await api_gateway.request({
				url,
				method,
				...(token && { headers: { Authorization: `Bearer ${token}` } }),
				...requestOptions,
			});
			setData(response.data.content);
		} catch (error: any) {
			if (error.response) {
				setErrors(error.response.data.errorCode);
			}
		}

		setIsLoading(false);
	};

	return [isLoading, data, errors, execute];
};
