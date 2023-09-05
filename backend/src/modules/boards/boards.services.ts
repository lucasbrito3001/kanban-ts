import Joi from "joi";
import { Repository } from "typeorm";
import { Board } from "./boards.interfaces";

export class BoardsService implements Board {
	constructor(
		private boardRepo: Repository<any>,
		private boardDtoSchema: Joi.ObjectSchema
	) {}

	public create = async (
		user: any
	): Promise<boolean | null | Joi.ValidationError> => {
		try {
			return true;
		} catch (error) {
			return null;
		}
	};
}
