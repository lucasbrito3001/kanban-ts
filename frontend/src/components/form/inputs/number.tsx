import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputText from "./text";

export default function InputNumber<TFieldValues extends FieldValues>({
	key,
	placeholder,
	labelTarget,
	reactHookFormRegister,
}: {
	key: Path<TFieldValues>;
	placeholder: string;
	labelTarget: string;
	reactHookFormRegister: UseFormRegister<TFieldValues>;
}) {
	return InputText({
		type: "number",
		placeholder,
		key,
		labelTarget,
		reactHookFormRegister,
	});
}
