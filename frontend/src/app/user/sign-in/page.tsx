"use client";
import DynamicForm from "@/components/form";
import React, { useEffect } from "react";
import {
	SIGN_IN_FORM_FIELDS,
	SIGN_IN_FORM_FIELDS_SCHEMA,
	SignInFormInputs,
} from "./constants";
import { SubmitHandler } from "react-hook-form";
import { useRequest } from "@/hooks/use-request/index";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { storeToken } from "@/services/session";

const TOAST_MESSAGES = {
	SUCCESS: "Authenticated successfully, redirecting to dashboard...",
	INVALID_DTO: "Invalid values, please check and try again.",
	BAD_USERNAME: "Bad credentials, please try again.",
	BAD_PASSWORD: "Bad credentials, please try again.",
};

export default function SignIn() {
	const [isLoadingSignIn, dataSignIn, errorsSignIn, createUser] = useRequest<
		string,
		keyof typeof TOAST_MESSAGES
	>("AUTH_USER");

	useEffect(() => {
		if (dataSignIn !== null) {
			toast(TOAST_MESSAGES["SUCCESS"], {
				type: "success",
			});

			storeToken(dataSignIn);

			redirect("/dashboard");
		}

		if (errorsSignIn !== null)
			toast(TOAST_MESSAGES[errorsSignIn], {
				type: "error",
			});
	}, [dataSignIn, errorsSignIn]);

	const signIn: SubmitHandler<SignInFormInputs> = async (
		userInfos: SignInFormInputs
	) => {
		await createUser({ data: userInfos });
	};

	const renderForm = () => {
		return DynamicForm<SignInFormInputs>({
			onSubmit: signIn,
			buttonText: "Enter",
			fields: SIGN_IN_FORM_FIELDS,
			schema: SIGN_IN_FORM_FIELDS_SCHEMA,
			isLoading: isLoadingSignIn,
			showButton: true,
			formId: "signIn",
			submitSuccessfully: false,
		});
	};

	return (
		<div className="border rounded-md shadow-lg shadow-gray max-w-md w-full p-10 bg-white">
			<div className="w-full">
				<div className="mb-4 w-full text-center ">
					<p className="text-2xl">
						Welcome to{" "}
						<span className="font-bold">
							Kanban<span className="text-sky-600">AI</span>!
						</span>
					</p>
					<p className="text-md text-gray-600 font-regular text-muted">
						It will be a pleasure to have you here
					</p>
				</div>
				{renderForm()}
			</div>
		</div>
	);
}
