import { FieldErrors, FieldName, FieldValues, useForm } from "react-hook-form";
import InputText from "./inputs/text";
import { DynamicFormProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "./inputs/password";
import InputNumber from "./inputs/number";
import {
	ErrorMessage,
	FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import InputColor from "./inputs/color";

export default function DynamicForm<TFieldValues extends FieldValues>({
	onSubmit,
	fields,
	schema,
	buttonText,
	isLoading,
	showButton,
	formId,
}: DynamicFormProps<TFieldValues>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TFieldValues>({
		resolver: zodResolver(schema),
	});

	const renderFields = (): JSX.Element[] => {
		const inputsByType = {
			text: InputText,
			number: InputNumber,
			password: InputPassword,
			money: InputText,
			select: InputText,
			textarea: InputText,
			color: InputColor,
		};

		return fields.map((field, idx) => {
			return (
				<fieldset className="flex flex-col w-full mb-4" key={idx}>
					<label className="mb-2" htmlFor={field.key}>
						{field.label}
					</label>
					{inputsByType[field.type]({
						key: field.key,
						placeholder: field.placeholder,
						labelTarget: field.key,
						reactHookFormRegister: register,
					})}
					<small className="text-red-500">
						<ErrorMessage
							errors={errors}
							name={
								field.key as unknown as FieldName<
									FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
								>
							}
						></ErrorMessage>
					</small>
				</fieldset>
			);
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-xl"
			id={formId}
		>
			{renderFields()}
			{showButton && (
				<button
					type="submit"
					className="mt-5 w-full rounded p-2 bg-sky-600 hover:bg-sky-700 transition-all transition-500 text-white font-bold"
					disabled={isLoading}
				>
					{buttonText}
				</button>
			)}
		</form>
	);
}
