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
import { Card } from '@/resources/card/entities/card.entity';
import { List } from '@/resources/list/entities/list.entity';

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

    @OneToMany(() => Card, (card) => card.board)
    @JoinColumn()
    public cards!: Card[];

    @OneToMany(() => List, (list) => list.board)
    @JoinColumn()
    public lists!: List[];
}

export type BoardDto = {
    name: string;
    bgColor: string;
};
