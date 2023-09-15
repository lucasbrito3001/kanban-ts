import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import * as Joi from 'joi';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export const updateUserDtoSchema = Joi.object({
	username: Joi.string().alphanum().min(5),
	password: Joi.string().min(8),
	firstName: Joi.string(),
	lastName: Joi.string(),
});