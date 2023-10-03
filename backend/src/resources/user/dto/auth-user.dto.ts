import * as Joi from 'joi';

export class AuthUserDto {
    public username: string;
    public password: string;
}

export const authUserDtoSchema = Joi.object({
    username: Joi.string().alphanum().min(5).required(),
    password: Joi.string().min(8).required(),
});

export const MOCK_AUTH_USER_DTO = {
    username: 'username',
    password: 'password',
};
