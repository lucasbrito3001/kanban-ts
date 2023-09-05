import { Request, Response } from "express";
import { User, UserAdapter } from "./users.interfaces";
import {
	BadRequestResponse,
	CreatedResponse,
	InternalServerErrorResponse,
	OkResponse,
} from "@/utils/response.services";

export class UserController implements UserAdapter {
	constructor(private userService: User) {}

	public create = async (
		req: Request,
		res: Response
	): Promise<Response<any>> => {
		const payload = req.body;
		let response:
			| InternalServerErrorResponse
			| CreatedResponse
			| BadRequestResponse = new CreatedResponse();

		const resultCreation = await this.userService.create(payload);

		if (resultCreation === null || resultCreation === false)
			response = new InternalServerErrorResponse();
		else if (typeof resultCreation === "string")
			response = new BadRequestResponse(resultCreation);

		return res.status(response.statusCode).json(response);
	};

	public readOne = async (
		req: Request,
		res: Response
	): Promise<Response<any>> => {
		const { id } = req.params;
		let response: BadRequestResponse | OkResponse = new BadRequestResponse(
			"User not found"
		);

		const user = await this.userService.getOne(id);

		if (user !== null) response = new OkResponse(user);

		return res.status(response.statusCode).json(response);
	};
}
