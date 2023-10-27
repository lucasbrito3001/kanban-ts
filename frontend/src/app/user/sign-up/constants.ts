import { Field } from "@/components/form/types";
import { z } from "zod";

export type SignUpFormInputs = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
};

export const SIGN_UP_FORM_FIELDS: Field<SignUpFormInputs>[] = [
	{
		key: "firstName",
		type: "text",
		label: "First name",
		placeholder: "ex: Sammy",
	},
	{
		key: "lastName",
		type: "text",
		label: "Last name",
		placeholder: "ex: Smith",
	},
	{
		key: "username",
		type: "text",
		label: "Username",
		placeholder: "ex: s4mmysm1th",
	},
	{
		key: "password",
		type: "password",
		label: "Password",
		placeholder: "type a strong password",
	},
];

export const SIGN_UP_FORM_FIELDS_SCHEMA = z.object({
	firstName: z.string().min(1, "First name must contain at least 1 character"),
	lastName: z.string().min(1, "Last name must contain at least 1 character"),
	username: z.string().min(6, "Username must contain at least 6 characters"),
	password: z.string().min(8, "Password must contain at least 8 characters"),
});
