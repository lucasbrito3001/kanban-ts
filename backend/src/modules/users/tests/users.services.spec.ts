import { SpyInstance, beforeAll, describe, expect, it, vi } from "vitest"
import { UserService } from "../users.services";
import { Repository } from "typeorm";
import Joi from "joi";

const mockRepository = {
    save: vi.fn(),
    findOneBy: vi.fn()
};

const mockJoiObjectSchema = {
    validate: vi.fn()
}

const mockHashService = {
    createHash: vi.fn(),
    compareHash: vi.fn()
}

const mockJwtService = {
    createToken: vi.fn(),
    decodeToken: vi.fn(),
}

const userService = new UserService(
    mockRepository as any as Repository<any>,
    mockHashService,
    mockJwtService,
    mockJoiObjectSchema as any as Joi.ObjectSchema
)

const mockUserDto = {
    username: 'mock',
    password: 'mock',
    firstName: 'mock',
    lastName: 'mock'
}

describe("[SERVICE] Testing the UserService", () => {
    let spyValidate: SpyInstance
    let spyCreateHash: SpyInstance
    let spyCompareHash: SpyInstance
    let spySave: SpyInstance
    let spyFindOneBy: SpyInstance
    let spyCreateToken: SpyInstance

    beforeAll(() => {
        spyValidate = vi.spyOn(mockJoiObjectSchema, 'validate')
        spyCreateHash = vi.spyOn(mockHashService, 'createHash')
        spyCompareHash = vi.spyOn(mockHashService, 'compareHash')
        spySave = vi.spyOn(mockRepository, 'save')
        spyFindOneBy = vi.spyOn(mockRepository, 'findOneBy')
        spyCreateToken = vi.spyOn(mockJwtService, 'createToken')
    })

    describe("the 'create' method", () => {
        it('should return the error message when the DTO is invalid', async () => {
            spyValidate.mockReturnValueOnce({ error: "error" })
    
            const result = await userService.create(mockUserDto)
    
            expect(result).toBe('error')
        })
    
        it('should return false if the hash fail', async () => {
            spyValidate.mockReturnValueOnce({ value: mockUserDto })
            spyCreateHash.mockReturnValueOnce(null)
    
            const result = await userService.create(mockUserDto)
    
            expect(result).toBe(false)
        })
    
        it('should return false when throw error', async () => {
            spyValidate.mockReturnValueOnce({ value: mockUserDto })
            spyCreateHash.mockRejectedValueOnce(null)
    
            const result = await userService.create(mockUserDto)
    
            expect(result).toBeNull()
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

    describe("the 'authenticate' method", () => {
        it('should return false when the user is not found', async () => {
            spyFindOneBy.mockReturnValueOnce(null)

            const result = await userService.authenticate(mockUserDto.password, 'passwd')

            expect(result).toBe(false)
        })

        it('should return false when the passwords do not match', async () => {
            spyFindOneBy.mockReturnValueOnce(mockUserDto)
            spyCompareHash.mockReturnValueOnce(false)

            const result = await userService.authenticate(mockUserDto.password, 'passwd')

            expect(result).toBe(false)
        })

        it('should return null when throw an error', async () => {
            spyFindOneBy.mockRejectedValueOnce(mockUserDto)

            const result = await userService.authenticate(mockUserDto.password, 'passwd')

            expect(result).toBe(null)
        })

        it('should return true when the passwords match', async () => {
            spyFindOneBy.mockReturnValueOnce(mockUserDto)
            spyCompareHash.mockReturnValueOnce(true)
            spyCreateToken.mockReturnValueOnce('token')

            const result = await userService.authenticate(mockUserDto.password, 'passwd')

            expect(result).toBe('token')
        })
    })
})
