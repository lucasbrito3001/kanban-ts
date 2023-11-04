import { redirect, useRouter } from "next/navigation";

type BoardCardProps = {
	id: string;
	name: string;
	bgColor: string;
	quantityMembers: number;
	quantityLists: number;
};

export default function BoardCard({
	id,
	name,
	quantityMembers,
	quantityLists,
	bgColor,
}: BoardCardProps) {
	const { push } = useRouter();
	const redirectToBoard = () => push(`/board/${id}`);

	return (
		<div
			className={`shadow-lg flex flex-col rounded justify-between border-l-[16px] p-3 h-32 hover:scale-105 transition-all transition-500 cursor-pointer`}
			style={{ borderLeftColor: `#${bgColor}aa` }}
			onClick={redirectToBoard}
		>
			<h1 className="text-sm font-bold">{name}</h1>
			<hr />
			<div>
				<span className="text-xs font-bold text-gray-600">Board infos:</span>
				<ul>
					<li className="text-xs text-gray-500">{quantityMembers} members</li>
					<li className="text-xs text-gray-500">{quantityLists} columns</li>
				</ul>
			</div>
		</div>
	);
}
