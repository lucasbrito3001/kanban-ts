import * as Joi from 'joi';

export class CreateUserDto {
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
}

export const createUserDtoSchema = Joi.object({
    username: Joi.string().alphanum().min(5).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

export const MOCK_CREATE_USER_DTO = {
    username: 'username',
    password: 'password',
    firstName: 'Sammy',
    lastName: 'Smith',
};
