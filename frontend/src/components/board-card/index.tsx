import { Board } from "../../app/dashboard/page";

export default function BoardCard({ name, bgColor }: Board) {
	const hexColor = `bg-[${bgColor}]`;

	return (
		<div className={`${hexColor} p-3 h-32 border rounded-md`}>
			<h1 className="text-xl font-bold">{name}</h1>
		</div>
	);
}
