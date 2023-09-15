import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { Board } from '@/resources/board/entities/board.entity';

export const VALID_ROLES = ['admin', 'editor', 'reader'];

@Entity({ name: 'board_member' })
export class BoardMember {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column('enum', { enum: VALID_ROLES, default: 'reader' })
    public role!: string;

    @ManyToOne(() => User, (user) => user.boardMembers, { nullable: false })
    @JoinTable()
    public user!: User[];

    @ManyToOne(() => Board, (board) => board.boardMembers, {
        nullable: false,
    })
    @JoinTable()
    public board!: Board[];
}
