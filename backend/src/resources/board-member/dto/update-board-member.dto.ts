import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardMemberDto } from './create-board-member.dto';
import * as Joi from 'joi';
import { ValidRoles } from '../entities/board-member.entity';

export class UpdateBoardMemberDto extends PartialType(CreateBoardMemberDto) {}

export const updateBoardMemberDtoSchema = Joi.object({
    role: Joi.string()
        .valid(...Object.values(ValidRoles))
        .required(),
});
