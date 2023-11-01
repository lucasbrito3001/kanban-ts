import * as Joi from 'joi';

export class CreateBoardDto {
    name: string;
    bgColor: string;
}

export const createBoardDtoSchema = Joi.object({
    name: Joi.string().max(48).required(),
    bgColor: Joi.string().alphanum().length(6).required(),
});

export const MOCK_CREATE_BOARD_DTO = {
    name: 'board',
    bgColor: '000000',
};
