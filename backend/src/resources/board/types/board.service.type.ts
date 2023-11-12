import { ResponseFormat } from '@/utils/response/response.type';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entities/board.entity';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { List } from '@/resources/list/entities/list.entity';
import { Card } from '@/resources/card/entities/card.entity';
import { BoardMember } from '@/resources/board-member/entities/board-member.entity';

export interface IBoardService {
    create(
        userId: string,
        createBoardDto: CreateBoardDto,
    ): Promise<ResponseFormat<Board>>;
    findByUser(userId: string): Promise<ResponseFormat<Board[]>>;
    findOne(id: string): Promise<ResponseFormat<Board>>;
    update(
        id: string,
        updateUserDto: UpdateBoardDto,
    ): Promise<ResponseFormat<Board>>;
    remove(id: string): Promise<ResponseFormat<string>>;
}

export interface GetBoardContent extends Board {
    members: BoardMember[];
    lists: List[];
}
