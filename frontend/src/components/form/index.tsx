import { DynamicFormProps } from "./types";

export default function DynamicForm({
	onSubmit,
	fields,
	schema,
}: DynamicFormProps) {
	const renderFields = (): JSX.Element[] =>
		fields.map((field, idx) => {
			return (
				<fieldset className="w-100 flex flex-col">
					<label className="flex-1" htmlFor={field.key}>{field.label}</label>
					<input
                        className="flex-1"
						id={field.key}
						type="text"
						key={idx}
						placeholder={field.placeholder}
					/>
				</fieldset>
			);
		});

	return (
		<form onSubmit={onSubmit}>
			{renderFields()}
			<button type="submit"></button>
		</form>
	);
}
