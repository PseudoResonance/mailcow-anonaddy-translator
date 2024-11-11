import express, { Router } from "express";
import aliases from "./aliases";
import App from "@/app";

export default (app: App) => {
	const router: Router = express.Router();

	router.use("/aliases", aliases(app));

	return router;
};
