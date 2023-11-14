import { Board } from '@/resources/board/entities/board.entity';
import { Card } from '@/resources/card/entities/card.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public color: string;

    @ManyToOne(() => Board, (board) => board.tags, { nullable: false })
    @JoinColumn()
    public board!: Board;
}
