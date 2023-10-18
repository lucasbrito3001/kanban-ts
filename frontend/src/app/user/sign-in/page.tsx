"use client";
import DynamicForm from "@/components/form";
import React from "react";
import { SIGN_IN_FORM_FIELDS, SIGN_IN_FORM_FIELDS_SCHEMA } from "./constants";

export default function SignIn() {
	const tryAuthenticate = (event: React.FormEvent<HTMLFormElement>) => {
		console.log(event.target);
	};

	return (
		<div className="border p-3 rounded-md">
			<DynamicForm
				onSubmit={tryAuthenticate}
				fields={SIGN_IN_FORM_FIELDS}
				schema={SIGN_IN_FORM_FIELDS_SCHEMA}
			></DynamicForm>
		</div>
	);
}
