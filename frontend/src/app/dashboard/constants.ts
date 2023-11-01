import { Field } from "@/components/form/types";
import { z } from "zod";

export type Board = {
	id: string;
	name: string;
	bgColor: string;
	createdAt: Date;
	updatedAt: Date;
};

export type BoardMember = {
	id: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
	board: Board;
};

export type CreateBoardFormInputs = {
	name: string;
	bgColor: string;
};

export const CREATE_BOARD_FORM_FIELDS: Field<CreateBoardFormInputs>[] = [
	{
		key: "name",
		type: "text",
		label: "Name:",
		placeholder: "ex: Foo Development",
	},
	{
		key: "bgColor",
		type: "color",
		label: "Background color:",
		placeholder: "ex: #dc23f5",
	},
];

export const CREATE_BOARD_FORM_FIELDS_SCHEMA = z.object({
	name: z.string().min(6, "Name must contain at least 6 characters"),
	bgColor: z
		.string()
		.min(7, "Background color must have at least 7 characters"),
});
