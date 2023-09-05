import Joi from "joi";
import { NextFunction, Request, Response } from "express";

export interface Board {
	create(user: any): Promise<boolean | null | Joi.ValidationError>;
}

export interface BoardAdapter {
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
