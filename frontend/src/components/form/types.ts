import { FormEvent } from "react";
import { z } from "zod";

export type Field = {
	key: string;
	type: "text" | "number" | "money" | "select" | "textarea" | "password";
	label: string;
	placeholder: string;
	options?: { key: string; value: string };
};

export type DynamicFormProps = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	fields: Field[];
	schema: z.ZodObject<any>;
};
