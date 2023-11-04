type Member = {};
type List = {};
type Card = {};

export type BoardContent = {
	id: string;
	name: string;
	bgColor: string;
	createdAt: Date;
	updatedAt: Date;
	lists: List[];
	members: Member[];
	cards: Card[];
};
