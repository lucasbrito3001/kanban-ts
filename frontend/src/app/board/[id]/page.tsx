"use client";

import { useRequest } from "@/hooks/use-request";
import { useEffect } from "react";
import List from "@/components/list";
import { BoardContent, BoardList } from "./constants";
import Card from "@/components/card";

const ERRORS_MESSAGES = {
	DUPLICATED_KEY: "Board name already in use.",
};

export default function Board({ params }: { params: { id: string } }) {
	const [
		isLoadingBoardContent,
		boardContent,
		errorsBoardContent,
		getBoardContent,
	] = useRequest<BoardContent, keyof typeof ERRORS_MESSAGES>(
		"GET_BOARD_CONTENT"
	);
	const [isLoadingCreateList, dataCreateList, errorsCreateList, createList] =
		useRequest<BoardList, keyof typeof ERRORS_MESSAGES>("CREATE_LIST");
	const [isLoadingCreateCard, dataCreateCard, errorsCreateCard, createCard] =
		useRequest<BoardList, keyof typeof ERRORS_MESSAGES>("CREATE_CARD");

	useEffect(() => {
		const isRenderingScreen =
			dataCreateCard === null &&
			errorsCreateCard === null &&
			!isLoadingBoardContent;

		if (dataCreateCard !== null || isRenderingScreen) {
			getBoardContent({}, { boardId: params.id });
			// hideModal();
		}
	}, [dataCreateCard]);

	return (
		<div className="h-full w-full p-4">
			{isLoadingBoardContent ? (
				<div className="h-full w-full grid place-items-center">
					<div className="flex items-center bg-gray-200 px-4 py-2 rounded shadow">
						<svg
							className="animate-spin-slow h-6 w-6 mr-3 border-sky-600 border-dotted rounded-full border-4"
							viewBox="0 0 24 24"
						></svg>
						Loading board infos...
					</div>
				</div>
			) : (
				<div className="flex items-start h-full w-full gap-4">
					{boardContent?.lists.map((list, idx) => {
						return (
							<List name={list.name} key={idx}>
								<ul className="flex gap-2 flex-col">
									{list.cards.map((card, idx) => {
										return (
											<li key={idx}>
												<Card
													name={card.name}
													priority={card.priority}
												/>
											</li>
										);
									})}
								</ul>
							</List>
						);
					})}
					<button className="rounded text-left bg-[#ccccccaa] text-white text-sm py-3 px-4 max-w-[260px] w-full font-bold">
						<span className="mr-2">+</span> Add new list
					</button>
				</div>
			)}
		</div>
	);
}
