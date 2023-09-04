import Joi from "joi"
import { Repository } from "typeorm"
import { UserDto, UserEntity } from "./users.entity"
import { Hasher } from "@/utils/hash.services"

export class UserService {
    constructor(
        private userRepo: Repository<UserEntity>,
        private hashService: Hasher,
        private dtoSchema: Joi.ObjectSchema
    ) { }

    async create(user: UserDto): Promise<boolean | Joi.ValidationError> {
        try {
            const { error, value } = this.dtoSchema.validate(user)

            if (error) return error

            const hashPassword = await this.hashService.createHash(user.password)

            if (hashPassword === null) return false

            await this.userRepo.save({ ...value, password: hashPassword })

            return true
        } catch (error) {
            return false
        }
    }

    async authenticate(username: string, password: string) {
        
    }
}