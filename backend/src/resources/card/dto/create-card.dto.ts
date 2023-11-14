import { MOCK_UUID } from '@/constants';
import * as Joi from 'joi';

export class CreateCardDto {
    name: string;
    description: string;
    priority: string;
    asignee: string;
    dueDate: Date;
    listId: string;
    tagIds?: string[];
}

export const createCardDtoSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().required(),
    asignee: Joi.string().required(),
    dueDate: Joi.date().required(),
    list: Joi.string().required(),
    tags: Joi.array(),
});

export const MOCK_CREATE_CARD_DTO = {
    name: 'name',
    description: 'description',
    priority: 'high',
    asignee: MOCK_UUID,
    dueDate: new Date(),
    listId: MOCK_UUID,
    tagIds: [MOCK_UUID],
};
