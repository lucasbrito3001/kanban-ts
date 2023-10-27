import { api_gateway } from "@/services/api";
import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { requests, requestsDict } from "./constants";

type generalReturn<T, K> = [
	boolean,
	T | null,
	K,
	(params: AxiosRequestConfig) => Promise<void>
];

export const useRequest = <T, K>(type: requests): generalReturn<T, K> => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [errors, setErrors] = useState<any>(null);

	const { url, method } = requestsDict[type];

	const execute = async (requestOptions: AxiosRequestConfig) => {
		setErrors(null);
		setData(null);
		setIsLoading(true);

		try {
			const response = await api_gateway.request({
				url,
				method,
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
