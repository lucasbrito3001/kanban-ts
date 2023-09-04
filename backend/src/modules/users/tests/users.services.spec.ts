import { SpyInstance, beforeAll, describe, expect, it, vi } from "vitest"
import { UserService } from "../users.services";
import { Repository } from "typeorm";
import Joi from "joi";

const mockRepository = {
    save: vi.fn(),
    find: vi.fn()
};

const mockJoiObjectSchema = {
    validate: vi.fn()
}

const mockHashService = {
    createHash: vi.fn(),
    compareHash: vi.fn()
}

const userService = new UserService(
    mockRepository as any as Repository<any>,
    mockHashService,
    mockJoiObjectSchema as any as Joi.ObjectSchema
)

const mockUserDto = {
    username: 'mock',
    password: 'mock',
    firstName: 'mock',
    lastName: 'mock'
}

describe("[SERVICE] Testing the UserService 'create' method", () => {
    let spyValidate: SpyInstance
    let spyCreateHash: SpyInstance
    let spySave: SpyInstance

    beforeAll(() => {
        spyValidate = vi.spyOn(mockJoiObjectSchema, 'validate')
        spyCreateHash = vi.spyOn(mockHashService, 'createHash')
        spySave = vi.spyOn(mockRepository, 'save')
    })

    it('should return the error message when the DTO is invalid', async () => {
        spyValidate.mockReturnValueOnce({ error: "error" })

        const result = await userService.create(mockUserDto)

        expect(result).toBe('error')
    })

    it('should return false if the hash fail', async () => {
        spyValidate.mockReturnValueOnce({ value: mockUserDto })
        spyCreateHash.mockReturnValueOnce(null)

        const result = await userService.create(mockUserDto)

        expect(result).toBeFalsy()
    })

    it('should return false when throw error', async () => {
        spyValidate.mockReturnValueOnce({ value: mockUserDto })
        spyCreateHash.mockRejectedValueOnce(null)

        const result = await userService.create(mockUserDto)

        expect(result).toBeFalsy()
    })

    it('should call the save method with the hash password', async () => {
        spyValidate.mockReturnValueOnce({ value: mockUserDto })
        spyCreateHash.mockReturnValueOnce('hash')

        await userService.create(mockUserDto)

        expect(spySave).toHaveBeenCalledWith({ ...mockUserDto, password: 'hash' })
    })

    it('should call the save method with the hash password', async () => {
        spyValidate.mockReturnValueOnce({ value: mockUserDto })
        spyCreateHash.mockReturnValueOnce('hash')

        const result = await userService.create(mockUserDto)

        expect(result).toBeTruthy()
    })
})