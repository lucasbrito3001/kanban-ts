import Joi from "joi"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true })
    username!: string

    @Column()
    password!: string

    @Column()
    firstName!: string

    @Column()
    lastName!: string
}

export type UserDto = {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export const userDtoSchema = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(5)
        .required(),
    password: Joi
        .string()
        .min(8)
        .required(),
    firstName: Joi
        .string()
        .required(),
    lastName: Joi
        .string()
        .required()
})