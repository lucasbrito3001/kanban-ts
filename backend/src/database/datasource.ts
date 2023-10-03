import { BoardMember } from '@/resources/board-member/entities/board-member.entity';
import { Board } from '@/resources/board/entities/board.entity';
import { User } from '@/resources/user/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class DataSource {
    private devConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: +'3306',
        username: 'root',
        password: 'root',
        database: 'kanban',
        synchronize: true,
        logging: true,
        entities: [
            join(__dirname, '../resources/**/entities/*.entity{.js, .ts}'),
        ],
    };
    private hmlConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: '',
        port: +'',
        username: '',
        password: '',
        database: '',
        entities: [
            join(__dirname, '../resources/**/entities/*.entity{.js, .ts}'),
        ],
        synchronize: false,
        logging: true,
    };
    private prdConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: '',
        port: +'',
        username: '',
        password: '',
        database: '',
        entities: [
            join(__dirname, '../resources/**/entities/*.entity{.js, .ts}'),
        ],
        synchronize: false,
        logging: true,
    };

    public getConfig(env: string): TypeOrmModuleOptions {
        const configs = {
            hml: this.hmlConfig,
            prd: this.prdConfig,
        };

        return configs[env] || this.devConfig;
    }
}
