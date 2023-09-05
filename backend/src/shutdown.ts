import { DataSource } from "typeorm";
import { Server, IncomingMessage, ServerResponse } from "node:http";

export class GracefulShutdown {
	constructor(
		databaseConnection: DataSource,
		server: Server<typeof IncomingMessage, typeof ServerResponse>
	) {}

    public start() {
        
    }
}
