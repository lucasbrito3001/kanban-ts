import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputText from "./text";

export default function InputColor<TFieldValues extends FieldValues>({
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
	return (
		<input
			className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id={labelTarget}
			type="color"
			placeholder={placeholder}
			{...reactHookFormRegister(key)}
		></input>
	);
}
