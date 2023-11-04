"use client";

import { useRequest } from "@/hooks/use-request";
import { BoardContent } from "./constants";
import { useEffect } from "react";
import { List } from "postcss/lib/list";

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
		useRequest<List, keyof typeof ERRORS_MESSAGES>("CREATE_LIST");
	const [isLoadingCreateCard, dataCreateCard, errorsCreateCard, createCard] =
		useRequest<List, keyof typeof ERRORS_MESSAGES>("CREATE_CARD");

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

	return <div className="h-full w-full p-4">
		{params.id}
	</div>;
}
