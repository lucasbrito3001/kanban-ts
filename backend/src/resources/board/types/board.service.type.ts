import { ResponseFormat } from '@/utils/response/response.type';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entities/board.entity';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface IBoardService {
    create(createBoardDto: CreateBoardDto): Promise<ResponseFormat<Board>>;
    findByUser(userId: string): Promise<ResponseFormat<Board[]>>;
    findOne(id: string): Promise<ResponseFormat<Board>>;
    update(
        id: string,
        updateUserDto: UpdateBoardDto,
    ): Promise<ResponseFormat<Board>>;
    remove(id: string): Promise<ResponseFormat<string>>;
}
