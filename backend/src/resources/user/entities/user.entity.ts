import { BoardMember } from '@/resources/board-member/entities/board-member.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @OneToMany(() => BoardMember, (boardMember) => boardMember.user)
    public boardMembers!: BoardMember[];
}
