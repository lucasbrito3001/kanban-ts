import "module-alias/register";
import { DatabaseConnection } from "./core/data-source";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserRouter } from "./modules/users/users.routes";
import express, { Router } from "express";
import { Server, IncomingMessage, ServerResponse } from "node:http";
import { GracefulShutdown } from "./shutdown";

export class HttpServer {
	private server:
		| Server<typeof IncomingMessage, typeof ServerResponse>
		| undefined = undefined;
	private dataSourceOptions: DataSourceOptions;
	private dataSource: DataSource;
	private application = express();

	constructor() {
		this.dataSourceOptions = {
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: ["../modules/**/*.entities.ts"],
		} as DataSourceOptions;

		this.dataSource = new DatabaseConnection(this.dataSourceOptions).connect();
	}

	public getRoutes(): Router[] {
		const userRoutes = new UserRouter(this.dataSource).getRoutes();

		this.application.use("/user", userRoutes);

		return [userRoutes];
	}

	public start() {
		this.server = this.application.listen("3000", () =>
			console.log("Listening on port 3000")
		);
	}

	public stop() {
		if (this.server === undefined) return "The server is not started";

		const gracefulShutdown = new GracefulShutdown(
			this.dataSource,
			this.server
		);
	}
}
