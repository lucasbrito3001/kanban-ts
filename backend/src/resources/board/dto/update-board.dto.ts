import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import * as Joi from 'joi';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}

export const updateBoardDtoSchema = Joi.object({
    name: Joi.string().alphanum().max(48),
    bgColor: Joi.string().alphanum().length(7),
});
