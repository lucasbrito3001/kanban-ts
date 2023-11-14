"use client";

import { useRequest } from "@/hooks/use-request";
import { useEffect, useState } from "react";
import List from "@/components/list";
import {
	BoardContent,
	BoardList,
	CREATE_LIST_FORM_FIELDS,
	CREATE_LIST_FORM_FIELDS_SCHEMA,
	CreateListFormInputs,
} from "./constants";
import Card from "@/components/card";
import Modal from "@/components/modal";
import DynamicForm from "@/components/form";
import { SubmitHandler } from "react-hook-form";

const ERRORS_MESSAGES = {
	DUPLICATED_KEY: "Board name already in use.",
};

export default function Board({ params }: { params: { id: string } }) {
	const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
	const [formModal, setFormModal] = useState<JSX.Element>();
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

	const renderForm = (formType: "LIST" | "CARD" | "TAG") => {
		return DynamicForm<CreateListFormInputs>({
			onSubmit: (listInfos: CreateListFormInputs) =>
				createList({ data: listInfos }),
			buttonText: "Create",
			fields: CREATE_LIST_FORM_FIELDS,
			schema: CREATE_LIST_FORM_FIELDS_SCHEMA,
			isLoading: isLoadingCreateList,
			showButton: false,
			submitSuccessfully: !!dataCreateList && !errorsCreateList,
			formId: "createList",
		});
	};

	const formList: JSX.Element = renderForm("LIST");
	const formCard: JSX.Element = renderForm("CARD");
	const formTag: JSX.Element = renderForm("TAG");

	const showModal = (form: "LIST" | "CARD" | "TAG") => {
		const modalByForm = {
			LIST: formList,
			CARD: formCard,
			TAG: formTag,
		};

		setFormModal(modalByForm[form]);
		setIsVisibleModal(true);
	};

	const hideModal = () => {
		setIsVisibleModal(false);
	};

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
							<List name={list.name} key={idx} onCreateCard={showModal}>
								<ul className="flex gap-2 flex-col">
									{list.cards.map((card, idx) => {
										return (
											<li key={idx}>
												<Card name={card.name} priority={card.priority} />
											</li>
										);
									})}
								</ul>
							</List>
						);
					})}
					<button
						className="rounded text-left bg-[#ccccccaa] text-white text-sm py-3 px-4 max-w-[260px] w-full font-bold"
						onClick={() => showModal("LIST")}
					>
						<span className="mr-2">+</span> Add new list
					</button>
				</div>
			)}
			{isVisibleModal && (
				<Modal
					title="Create new list"
					textConfirmButton="Create"
					type="NORMAL"
					onCancel={hideModal}
					formId="createList"
				>
					{formModal}
				</Modal>
			)}
		</div>
	);
}
