import Joi from "joi"
import { Repository } from "typeorm"
import { UserDto, UserEntity } from "./users.entity"
import { Hasher } from "@/utils/hash.services"
import { Jwt } from "@/utils/jwt.services"

export class UserService {
    constructor(
        private userRepo: Repository<UserEntity>,
        private hashService: Hasher,
        private jwtService: Jwt,
        private dtoSchema: Joi.ObjectSchema
    ) { }

    async create(user: UserDto): Promise<boolean | null | Joi.ValidationError> {
        try {
            const { error, value } = this.dtoSchema.validate(user)

            if (error) return error

            const hashPassword = await this.hashService.createHash(user.password)

            if (hashPassword === null) return false

            await this.userRepo.save({ ...value, password: hashPassword })

            return true
        } catch (error) {
            return null
        }
    }

    async authenticate(username: string, password: string): Promise<string | false | null> {
        try {
            const user = await this.userRepo.findOneBy({ username })

            if (user === null) return false

            const passwordsMatch = await this.hashService.compareHash(user.password, password)

            if (!passwordsMatch) return false

            return this.jwtService.createToken({ id: user.id, username: user.username })
        } catch (error) {
            return null
        }
    }
}