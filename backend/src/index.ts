import "module-alias/register";
import { HttpServer } from "./core/app";

const app = new HttpServer();

app.start();

const terminationSignals = ["SIGINT", "SIGTERM"];

terminationSignals.forEach((signal) => {
	process.on(signal, () => {
        console.log("\n[SYSTEM] Starting graceful shutdown...")
		app.stop((result) => {
			console.log(
				result ? "[SERVER] Server stopped successfully" : "[SERVER] Error to stop the server"
			);
			process.exit(result ? 0 : 1);
		})
    });
});
