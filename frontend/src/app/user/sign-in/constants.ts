import { Field } from "@/components/form/types";
import { z } from "zod";

export const SIGN_IN_FORM_FIELDS: Field[] = [
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

export const SIGN_IN_FORM_FIELDS_SCHEMA = z.object({
	firstName: z.string(),
	lastName: z.string(),
	username: z.string().min(6),
	password: z.string().min(8),
});
