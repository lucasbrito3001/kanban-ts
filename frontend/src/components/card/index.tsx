import { BoardCard } from "@/app/board/[id]/constants";

export default function Card({
	name,
	priority,
}: Pick<BoardCard, "name" | "priority">) {
	const PRIORITIES_COLOR = {
		high: "border-l-red-500",
		medium: "border-l-orange-500",
		low: "border-l-green-500",
	};

	return (
		<div
			className={`rounded w-full p-2 bg-neutral-700 border-l-2 ${PRIORITIES_COLOR[priority]}`}
		>
			<h1>{name}</h1>
		</div>
	);
}
