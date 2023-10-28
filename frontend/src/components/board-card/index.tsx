import { Board } from "../../app/dashboard/page";

export default function BoardCard({ name, bgColor }: Board) {
	return (
		<div
			className={`shadow-lg flex flex-col rounded justify-between border-l-[16px] p-3 h-32 hover:scale-105 transition-all transition-500`}
			style={{ borderLeftColor: `${bgColor}aa` }}
		>
			<h1 className="text-sm font-bold">{name}</h1>
			<hr />
			<div>
				<span className="text-xs font-bold text-gray-600">Board infos:</span>
				<ul>
					<li className="text-xs text-gray-500">32 members</li>
					<li className="text-xs text-gray-500">5 columns</li>
					<li className="text-xs text-gray-500">18 assigned to me</li>
				</ul>
			</div>
		</div>
	);
}
