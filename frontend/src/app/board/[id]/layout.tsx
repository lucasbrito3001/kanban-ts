"use client";

import { Board } from "@/app/dashboard/constants";
import Navbar from "@/components/navbar";
import { useRequest } from "@/hooks/use-request";
import { useEffect } from "react";
import { FaUserPlus, FaCog } from "react-icons/fa";

export default function SignLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const ERRORS_MESSAGES = {
		RESOURCE_NOT_FOUND: "Board not found",
	};

	const [isLoadingBoard, board, errorsBoard, getBoard] = useRequest<
		Board,
		keyof typeof ERRORS_MESSAGES
	>("GET_BOARD");

	useEffect(() => {
		getBoard({}, { boardId: params.id });
	}, []);

	return (
		<div className={`w-screen`}>
			<Navbar height="8vh">
				{board?.name}
				<button className="flex items-center gap-2 rounded p-2 bg-sky-600 hover:bg-sky-700 transition-all transition-500 text-white font-bold text-sm">
					<FaUserPlus width={32}></FaUserPlus> Add member
				</button>
				<FaCog></FaCog>
			</Navbar>
			<div className="h-[92vh] w-screen mt-[8vh]">{children}</div>
		</div>
	);
}
