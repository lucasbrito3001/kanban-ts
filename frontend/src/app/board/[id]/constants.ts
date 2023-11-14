import { Field } from "@/components/form/types";
import { z } from "zod";

export type BoardMember = {};
export type BoardCard = {
	id: string;
	name: string;
	description: string;
	priority: "high" | "medium" | "low";
	asignee: string;
	dueDate: Date;
	createdAt: Date;
	updatedAt: Date;
};
export type BoardList = {
	id: string;
	name: string;
	position: number;
	createdAt: Date;
	updatedAt: Date;
	cards: BoardCard[];
};
export type BoardTag = {
	id: string;
	name: string;
	color: string;
};
export type BoardContent = {
	id: string;
	name: string;
	bgColor: string;
	createdAt: Date;
	updatedAt: Date;
	lists: BoardList[];
	tags: BoardTag[];
	members: BoardMember[];
};

export type CreateListFormInputs = {
	name: string;
	position: string;
};
export const CREATE_LIST_FORM_FIELDS: Field<CreateListFormInputs>[] = [
	{
		key: "name",
		type: "text",
		label: "Name:",
		placeholder: "ex: To Do",
	},
	{
		key: "position",
		type: "number",
		label: "Position:",
		placeholder: "ex: 0",
	},
];

export const CREATE_LIST_FORM_FIELDS_SCHEMA = z.object({
	name: z.string().min(6, "Name must contain at least 6 characters"),
	position: z.number().int(),
});
