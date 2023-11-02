"use client";
import DynamicForm from "@/components/form";
import React, { useEffect } from "react";
import {
	SIGN_UP_FORM_FIELDS,
	SIGN_UP_FORM_FIELDS_SCHEMA,
	SignUpFormInputs,
} from "./constants";
import { SubmitHandler } from "react-hook-form";
import { useRequest } from "@/hooks/use-request/index";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const ERRORS_MESSAGES = {
	INVALID_DTO: "Invalid values, please check and try again.",
	DUPLICATED_KEY: "Username already in use.",
};

export default function SignUp() {
	const [isLoadingSignUp, dataSignUp, errorsSignUp, createUser] = useRequest<
		string,
		keyof typeof ERRORS_MESSAGES
	>("CREATE_USER");

	useEffect(() => {
		if (dataSignUp !== null) {
			toast("Registered succesfully, redirecting to sign in page...", {
				type: "success",
			});
			redirect("/user/sign-in");
		}

		if (errorsSignUp !== null)
			toast(ERRORS_MESSAGES[errorsSignUp], {
				type: "error",
			});
	}, [dataSignUp, errorsSignUp]);

	const signUp: SubmitHandler<SignUpFormInputs> = async (
		userInfos: SignUpFormInputs
	) => {
		await createUser({ data: userInfos });
	};

	const renderForm = () => {
		return DynamicForm<SignUpFormInputs>({
			onSubmit: signUp,
			buttonText: "Register",
			fields: SIGN_UP_FORM_FIELDS,
			schema: SIGN_UP_FORM_FIELDS_SCHEMA,
			isLoading: isLoadingSignUp,
			showButton: true,
			submitSuccessfully: true,
			formId: "signUp",
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
