import "dotenv/config";
import express, { type Request, type Response } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import apiv1 from "./apiv1";
import Backends from "./backend";
import App from "./app";
import Backend from "./backend/backend";

if (!("BACKEND" in process.env)) {
	console.error("BACKEND environment variable not defined");
	process.exit(1);
} else if (!((process.env.BACKEND as string) in Backends)) {
	console.error(`Invalid backend ${process.env.BACKEND}`);
	process.exit(1);
}
console.log(`Using backend ${process.env.BACKEND?.toUpperCase()}`);

let port = 8080;
if ("API_PORT" in process.env) {
	port = parseInt(process.env.API_PORT as string);
}

const app: App = {
	backend: null as unknown as Backend,
};
app.backend = new Backends[(process.env.BACKEND as string).toUpperCase()](app);
const expressApp = express();

expressApp.use(compression());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.get(["/", "/status"], (_: Request, res: Response) => {
	res.send({
		status: "ok",
	});
});

expressApp.use("/api/v1", apiv1(app));

expressApp.listen(port, () => {
	console.log(`Started server on port ${port}`);
});
