import * as Joi from 'joi';

export class CreateTagDto {
    name: string;
    color: string;
    boardId: string;
}

export const createBoardDtoSchema = Joi.object({
    name: Joi.string().max(48).required(),
    color: Joi.string().alphanum().length(6).required(),
});

export const MOCK_CREATE_BOARD_DTO = {
    name: 'tag',
    color: '000000',
};
