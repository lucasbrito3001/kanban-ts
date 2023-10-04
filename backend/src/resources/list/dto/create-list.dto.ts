import * as Joi from 'joi';

export class CreateListDto {
    name: string;
    position: number;
    boardId: string;
}

export const createListDtoSchema = Joi.object({
    name: Joi.string().required(),
    position: Joi.number().required(),
    boardId: Joi.string().uuid().required(),
});

export const MOCK_CREATE_LIST_DTO = {
    name: 'name',
    position: 0,
    boardId: '00000000-0000-0000-0000-000000000000',
};
