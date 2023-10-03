import * as Joi from "joi";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { BoardMember } from "@/resources/board-member/entities/board-member.entity";

@Entity({ name: "board" })
export class Board {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true, nullable: false })
	name!: string;

	@Column({ length: 7, nullable: false })
	bgColor!: string;

	@CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

	@OneToMany(() => BoardMember, (boardMember) => boardMember.board)
	public boardMembers!: BoardMember[];
}

export type BoardDto = {
	name: string;
	bgColor: string;
};
