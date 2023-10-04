import { Board } from '@/resources/board/entities/board.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
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
}
