import { Field } from "@/components/form/types";
import { z } from "zod";

export type SignInFormInputs = {
	username: string;
	password: string;
};

export const SIGN_IN_FORM_FIELDS: Field<SignInFormInputs>[] = [
	{
		key: "username",
		type: "text",
		label: "Username",
		placeholder: "type your username",
	},
	{
		key: "password",
		type: "password",
		label: "Password",
		placeholder: "type your password",
	},
];

export const SIGN_IN_FORM_FIELDS_SCHEMA = z.object({
	username: z.string().min(6, "Username must contain at least 6 characters"),
	password: z.string().min(8, "Password must contain at least 8 characters"),
});
