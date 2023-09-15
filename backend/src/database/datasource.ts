import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class DataSource {
    private devConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: '',
        port: +'',
        username: '',
        password: '',
        database: '',
        synchronize: false,
        logging: true
    }
    private hmlConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: '',
        port: +'',
        username: '',
        password: '',
        database: '',
        synchronize: false,
        logging: true
    }
    private prdConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: '',
        port: +'',
        username: '',
        password: '',
        database: '',
        synchronize: false,
        logging: true
    }

    public getConfig(env: string): TypeOrmModuleOptions {
        const configs = {
            'hml': this.hmlConfig,
            'prd': this.prdConfig
        }

        return configs[env] || this.devConfig
    }
}