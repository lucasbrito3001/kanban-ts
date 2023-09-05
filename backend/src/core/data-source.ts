import { DataSource, DataSourceOptions } from "typeorm";

export class DatabaseConnection {
	public dataSource: DataSource | undefined = undefined;

	constructor(private dataSourceOptions: DataSourceOptions) {}

	connect(): DataSource {
		const dataSource = new DataSource(this.dataSourceOptions);
		this.dataSource = dataSource;

		return this.dataSource;
	}

	async disconnect() {
		if (this.dataSource === undefined)
			return "The connection is not established";

		await this.dataSource.destroy();

		return "Connection closed successfully";
	}
}
