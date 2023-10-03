import * as Joi from 'joi';
import { ValidRoles } from '../entities/board-member.entity';

export class CreateBoardMemberDto {
    public boardId: string;
    public role: string;
}

export const createBoardMemberDtoSchema = Joi.object({
    boardId: Joi.string().uuid().required(),
    role: Joi.string()
        .valid(...Object.values(ValidRoles))
        .required(),
});
