import * as Joi from 'joi';
import { VALID_ROLES } from '../entities/board-member.entity';

export class CreateBoardMemberDto {
    public boardId: string;
    public userId: string;
    public role: string;
}

export const boardMemberDtoSchema = Joi.object({
    boardId: Joi.string().alphanum().uuid().required(),
    userId: Joi.string().alphanum().uuid().required(),
    role: Joi.string()
        .valid(...VALID_ROLES)
        .required(),
});
