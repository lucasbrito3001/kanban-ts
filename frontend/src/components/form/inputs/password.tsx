import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputText from "./text";

export default function InputPassword<TFieldValues extends FieldValues>({
	key,
	placeholder,
	labelTarget,
	reactHookFormRegister,
}: {
	type?: "text" | "password" | "number" | "email";
	key: Path<TFieldValues>;
	placeholder: string;
	labelTarget: string;
	reactHookFormRegister: UseFormRegister<TFieldValues>;
}) {
	return InputText({
		type: "password",
		placeholder,
		key,
		labelTarget,
		reactHookFormRegister,
	});
}
