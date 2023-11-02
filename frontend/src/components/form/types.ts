import { FieldValues, Path, SubmitHandler } from "react-hook-form";
import { z } from "zod";

export type Types =
	| "text"
	| "number"
	| "money"
	| "select"
	| "textarea"
	| "password"
	| "color";

export type Field<TFieldValues> = {
	key: Path<TFieldValues>;
	type: Types;
	label: string;
	placeholder: string;
	options?: { key: string; value: string };
};

export type DynamicFormProps<T extends FieldValues> = {
	onSubmit: SubmitHandler<T>;
	fields: Field<T>[];
	schema: z.ZodObject<any>;
	buttonText: string;
	isLoading: boolean;
	showButton: boolean;
	formId: string;
	submitSuccessfully: boolean;
};
