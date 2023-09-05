import "module-alias/register";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import express from "express";
import { Server, IncomingMessage, ServerResponse } from "node:http";
import { DatabaseConnection } from "./data-source";
import { UserRouter } from "@/modules/users/users.routes";
import { UserEntity } from "@/modules/users/users.entities";

dotenv.config();

export class HttpServer {
	private server:
		| Server<typeof IncomingMessage, typeof ServerResponse>
		| undefined = undefined;
	private dataSourceOptions: DataSourceOptions;
	private dataSource: DatabaseConnection;
	private databaseConnection: DataSource | undefined = undefined;
	private application = express();

	constructor() {
		this.dataSourceOptions = {
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [UserEntity],
			synchronize: true,
		} as DataSourceOptions;

		this.dataSource = new DatabaseConnection(this.dataSourceOptions);
	}

	public setRoutes = (dataSource: DataSource): void => {
		const userRoutes = new UserRouter(dataSource).getRoutes();

		this.application.use("/user", userRoutes);
	};

	public start = async () => {
        console.log("\n===========================================")
        console.log("[SERVER] Starting server...")
		this.databaseConnection = await this.dataSource.connect();

		if (this.databaseConnection === undefined) return;

		this.setRoutes(this.databaseConnection);

		this.server = this.application.listen("3000", () => {
			console.log("[SERVER] Started! Listening on port: 3000")
            console.log("===========================================")
        });
	};

	public stop = (callback: (value: any) => void): void => {
		if (this.server === undefined) {
			console.log("[SERVER] The server is not started");
			return callback(false);
		} else if (this.databaseConnection === undefined) {
			console.log("[DB] The connection is not established");
			return callback(false);
		}

		this.server.close(async () => {
			await this.dataSource.disconnect();
			callback(true);
		});
	};
}
