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
        logging: false,
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
