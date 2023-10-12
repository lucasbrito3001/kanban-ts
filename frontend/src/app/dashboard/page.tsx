"use client";
import { ReactNode, useState } from "react";
import BoardCard from "./components/board-card";

export type Board = {
	name: string;
	bgColor: string;
};

export default function Dashboard() {
	const [boards, setBoards] = useState<Board[]>([
		{ name: "teste", bgColor: "#0c0c0c" },
		{ name: "teste", bgColor: "#c3c3c3" },
	]);

	const renderBoards = (): JSX.Element[] => {
		return boards.map((board, idx) => {
			return <BoardCard key={idx} name={board.name} bgColor={board.bgColor} />;
		});
	};

	return (
		<div className="p-5 md:p-0">
			<aside className="mb-5">
				<h1 className="text-3xl font-bold">My boards</h1>
			</aside>
			<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
				{renderBoards()}
			</main>
		</div>
	);
}
