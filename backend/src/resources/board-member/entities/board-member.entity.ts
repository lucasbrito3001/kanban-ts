import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ColumnOptions,
    JoinColumn,
} from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { Board } from '@/resources/board/entities/board.entity';

export enum ValidRoles {
    ADMIN = 'admin',
    EDITOR = 'editor',
    READER = 'reader',
}

const enumParameters: ColumnOptions =
    process.env.NODE_ENV !== 'test'
        ? { type: 'enum', enum: ValidRoles, default: ValidRoles.READER }
        : { type: 'varchar' };

@Entity({ name: 'board_member' })
export class BoardMember {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column(enumParameters)
    public role!: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(() => User, (user) => user.boardMembers, { nullable: false })
    @JoinColumn()
    public user!: User;

    @ManyToOne(() => Board, (board) => board.members, {
        nullable: false,
    })
    @JoinColumn()
    public board!: Board;
}
