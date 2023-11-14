import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import * as Joi from 'joi';

export class UpdateTagDto extends PartialType(CreateTagDto) {}

export const updateTagDtoSchema = Joi.object({
    name: Joi.string().alphanum().max(48),
    color: Joi.string().alphanum().length(7),
});
