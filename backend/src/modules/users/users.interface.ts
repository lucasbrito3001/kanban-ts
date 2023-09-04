import Joi from "joi";
import { UserDto, UserEntity } from "./users.entity";

export interface User {
    create(user: UserDto): Promise<boolean | null | Joi.ValidationError>
    authenticate(username: string, password: string): Promise<string | false | null>
    getOne(id: string): Promise<Omit<UserEntity, 'password'> | null>
}