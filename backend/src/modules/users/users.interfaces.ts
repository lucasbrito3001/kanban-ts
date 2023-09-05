import Joi from "joi";
import { UserDto, UserEntity } from "./users.entities";
import { NextFunction, Request, Response } from "express";

export interface User {
	create(user: UserDto): Promise<boolean | null | Joi.ValidationError>;
	authenticate(
		username: string,
		password: string
	): Promise<string | false | null>;
	getOne(id: string): Promise<Omit<UserEntity, "password"> | null>;
}

export interface UserAdapter {
	create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any>>;
	readOne(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any>>;
}
