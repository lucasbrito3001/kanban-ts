import { Board } from '@/resources/board/entities/board.entity';
import { Card } from '@/resources/card/entities/card.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'list' })
export class List {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public position: number;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(() => Board, (board) => board.lists, { nullable: false })
    @JoinColumn()
    public board!: Board;

    @OneToMany(() => Card, (card) => card.list)
    @JoinColumn()
    public cards!: Card[];
}
