import { List } from '@/resources/list/entities/list.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'card' })
export class Card {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public description!: string;

    @Column({ nullable: false })
    public priority!: string;

    @Column({ nullable: true })
    public asignee: string;

    @Column({ nullable: true })
    public dueDate: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(() => List, (list) => list.cards, {
        nullable: false,
    })
    @JoinColumn({ name: 'listId' })
    public list!: List;
}
