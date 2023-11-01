"use client";
import { useEffect, useState } from "react";
import BoardCard from "../../components/board-card";
import Container from "@/components/container";
import Modal from "@/components/modal";
import { FaPlus } from "react-icons/fa";
import DynamicForm from "@/components/form";
import {
	Board,
	BoardMember,
	CREATE_BOARD_FORM_FIELDS,
	CREATE_BOARD_FORM_FIELDS_SCHEMA,
	CreateBoardFormInputs,
} from "./constants";
import { useRequest } from "@/hooks/use-request";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const ERRORS_MESSAGES = {
	DUPLICATED_KEY: "Board name already in use.",
};

export default function Dashboard() {
	const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
	const [
		isLoadingCreateBoard,
		dataCreateBoard,
		errorsCreateBoard,
		createBoard,
	] = useRequest<string, keyof typeof ERRORS_MESSAGES>("CREATE_BOARD");
	const [isLoadingGetBoards, dataGetBoards, errorsGetBoards, getBoards] =
		useRequest<BoardMember[], keyof typeof ERRORS_MESSAGES>("GET_BOARDS");

	useEffect(() => {
		const isRenderingScreen =
			dataCreateBoard === null &&
			errorsCreateBoard === null &&
			!isLoadingCreateBoard;

		if (dataCreateBoard !== null || isRenderingScreen) {
			getBoards({});
			hideModal();
		}
	}, [dataCreateBoard]);

	useEffect(() => {
		if (dataCreateBoard !== null) {
			toast("Board created succesfully.", {
				type: "success",
			});
		}

		if (errorsCreateBoard !== null)
			toast(
				ERRORS_MESSAGES[errorsCreateBoard] ||
					"An unexpected error occur, contact the administratr",
				{
					type: "error",
				}
			);
	}, [dataCreateBoard, errorsCreateBoard]);

	const showModal = () => setIsVisibleModal(true);
	const hideModal = () => setIsVisibleModal(false);

	const renderBoards = (): JSX.Element[] | undefined => {
		return dataGetBoards?.map(({ board }, idx) => {
			return (
				<BoardCard
					key={idx}
					id={board.id}
					name={board.name}
					bgColor={board.bgColor}
				/>
			);
		});
	};

	const create: SubmitHandler<CreateBoardFormInputs> = async (
		userInfos: CreateBoardFormInputs
	) => {
		userInfos.bgColor = userInfos.bgColor.replace("#", "");
		await createBoard({ data: userInfos });
	};

	const renderForm = () => {
		return DynamicForm<CreateBoardFormInputs>({
			onSubmit: create,
			buttonText: "Create",
			fields: CREATE_BOARD_FORM_FIELDS,
			schema: CREATE_BOARD_FORM_FIELDS_SCHEMA,
			isLoading: isLoadingCreateBoard,
			showButton: false,
			submitSuccessfully: !!dataCreateBoard && !errorsCreateBoard,
			formId: "createBoard",
		});
	};

	const form: JSX.Element = renderForm();

	return (
		<Container>
			<div className="pt-24 pb-10">
				<aside className="flex justify-between items-center mb-5">
					<h1 className="text-lg uppercase font-bold">My boards</h1>
					<a
						className="text-sm text-sky-600 hover:text-blue-800 visited:text-purple-600"
						href="/dashboard/boards"
					>
						view all boards
					</a>
				</aside>
				<main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{/* Rendering the boards */}
					{isLoadingGetBoards ? "loading..." : renderBoards()}

					{/* Last card with "+" to create a new board */}
					<div className="grid cursor-pointer place-content-center transition-all transition-500 p-4 h-32 rounded-md border-4 border-dashed hover:bg-gray-100">
						{" "}
						<FaPlus size="2em" color="gray" className="mx-auto"></FaPlus>
						<div className="mt-2 text-gray-500 font-bold" onClick={showModal}>
							Create board
						</div>
					</div>
				</main>
			</div>
			{isVisibleModal && (
				<Modal
					title="Create board"
					textConfirmButton="Create"
					type="NORMAL"
					onCancel={hideModal}
					formId="createBoard"
				>
					{form}
				</Modal>
			)}
		</Container>
	);
}
