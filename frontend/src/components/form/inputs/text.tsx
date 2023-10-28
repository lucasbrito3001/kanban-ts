import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Types } from "../types";

export default function InputText<TFieldValues extends FieldValues>({
	type,
	key,
	placeholder,
	labelTarget,
	reactHookFormRegister,
}: {
	type?: Types;
	key: Path<TFieldValues>;
	placeholder: string;
	labelTarget: string;
	reactHookFormRegister: UseFormRegister<TFieldValues>;
}) {
	return (
		<input
			className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id={labelTarget}
			type={type || "text"}
			placeholder={placeholder}
			{...reactHookFormRegister(key)}
		></input>
	);
}
