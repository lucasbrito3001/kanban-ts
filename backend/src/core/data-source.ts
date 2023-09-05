import { DataSource, DataSourceOptions } from "typeorm";

export interface Database {
	connect(): DataSource;
	disconnect(): Promise<boolean>;
}

export class DatabaseConnection {
	public dataSource: DataSource | undefined = undefined;

	constructor(private dataSourceOptions: DataSourceOptions) {}

	async connect(): Promise<DataSource | undefined> {
		try {
			console.log('[DB] Trying to connect...')
			const dataSource = await new DataSource(this.dataSourceOptions).initialize();
			this.dataSource = dataSource;

			console.log('[DB] Connected succesfully!')
			return this.dataSource;
		} catch (error) {
			console.log('[DB] Error to connect: ', error)
			return undefined;
		}
	}

	async disconnect(): Promise<boolean> {
		if (this.dataSource === undefined) {
			console.log("[DB] The connection is not established");
			return false;
		}

		await this.dataSource.destroy();

		console.log("[DB] Connection closed successfully");
		return true;
	}
}
