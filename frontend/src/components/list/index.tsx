export default function List({
	name,
	children,
	onCreateCard,
}: {
	name: string;
	children: React.ReactNode;
	onCreateCard: (type: "CARD") => void;
}) {
	return (
		<div className="flex flex-col max-h-full bg-[#0d0d0ddf] text-white w-[260px] px-2 rounded">
			<header className="w-full flex-none p-2">{name}</header>
			<div
				className="
					rounded
					scrollbar-thumb-rounded
					scrollbar-track-rounded
					overflow-y-scroll
					scrollbar-thumb-neutral-700
					scrollbar-track-neutral-800
					scrollbar-thin
					overflow-y-scroll
				"
			>
				<div className="pr-1">{children}</div>
			</div>
			<footer
				className="w-full flex-none p-2"
				onClick={() => onCreateCard("CARD")}
			>
				+ Add new card
			</footer>
		</div>
	);
}
