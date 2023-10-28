"use client";
import { useState } from "react";
import BoardCard from "../../components/board-card";
import Container from "@/components/container";
import Modal from "@/components/modal";
import { FaPlus } from "react-icons/fa";
import DynamicForm from "@/components/form";
import {
	CREATE_BOARD_FORM_FIELDS,
	CREATE_BOARD_FORM_FIELDS_SCHEMA,
	CreateBoardFormInputs,
} from "./constants";
import { useRequest } from "@/hooks/use-request";
import { SubmitHandler } from "react-hook-form";

export type Board = {
	name: string;
	bgColor: string;
};

const ERRORS_MESSAGES = {
	INVALID_DTO: "Invalid values, please check and try again.",
	DUPLICATED_KEY: "Username already in use.",
};

export default function Dashboard() {
	const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
	const [isLoadingCreateBoard, dataSignUp, errorsSignUp, createBoard] =
		useRequest<string, keyof typeof ERRORS_MESSAGES>("CREATE_BOARD");
	const [boards, setBoards] = useState<Board[]>([
		{ name: "SRE - DEVOPS", bgColor: "#ffa8fa" },
		{ name: "Eng. Software", bgColor: "#87faa2" },
		{ name: "Service Desk", bgColor: "#0c0c0c" },
		{ name: "CORE 5.0", bgColor: "#c3c3c3" },
		{ name: "Sustentação", bgColor: "#0c0c0c" },
		{ name: "Legado Maithá", bgColor: "#12c1cf" },
		{ name: "SRE - DEVOPS", bgColor: "#8745fc" },
		{ name: "Eng. Software", bgColor: "#87faa2" },
		{ name: "Service Desk", bgColor: "#0c0c0c" },
		{ name: "CORE 5.0", bgColor: "#ffcc11" },
		{ name: "Sustentação", bgColor: "#0c0c0c" },
		{ name: "Legado Maithá", bgColor: "#12c1cf" },
		{ name: "SRE - DEVOPS", bgColor: "#ffa8fa" },
		{ name: "Eng. Software", bgColor: "#87faa2" },
		{ name: "Service Desk", bgColor: "#0c0c0c" },
		{ name: "CORE 5.0", bgColor: "#c3c3c3" },
		{ name: "Sustentação", bgColor: "#0c0c0c" },
		{ name: "Legado Maithá", bgColor: "#5f6712" },
	]);

	const showModal = () => {
		setIsVisibleModal(true);
	};

	const hideModal = () => {
		setIsVisibleModal(false);
	};

	const renderBoards = (): JSX.Element[] => {
		return boards.map((board, idx) => {
			return <BoardCard key={idx} name={board.name} bgColor={board.bgColor} />;
		});
	};

	const create: SubmitHandler<CreateBoardFormInputs> = async (
		userInfos: CreateBoardFormInputs
	) => {
		console.log(userInfos)
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
					{renderBoards()}
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
