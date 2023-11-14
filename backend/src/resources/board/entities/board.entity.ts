import * as Joi from 'joi';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { BoardMember } from '@/resources/board-member/entities/board-member.entity';
import { List } from '@/resources/list/entities/list.entity';
import { Tag } from '@/resources/tag/entities/tag.entity';

@Entity({ name: 'board' })
export class Board {
    @PrimaryGeneratedColumn('uuid')
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
    @JoinColumn()
    public members!: BoardMember[];

    @OneToMany(() => List, (list) => list.board)
    @JoinColumn()
    public lists!: List[];

    @OneToMany(() => Tag, (tag) => tag.board)
    @JoinColumn()
    public tags!: Tag[];
}

export type BoardDto = {
    name: string;
    bgColor: string;
};
