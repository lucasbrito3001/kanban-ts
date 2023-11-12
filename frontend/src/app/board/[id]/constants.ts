export type Member = {};
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

export type BoardContent = {
	id: string;
	name: string;
	bgColor: string;
	createdAt: Date;
	updatedAt: Date;
	lists: BoardList[];
	members: Member[];
};
