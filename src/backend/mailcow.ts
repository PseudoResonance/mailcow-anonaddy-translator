import App from "@/app";
import Backend from "./backend";
import fetch from "node-fetch";
import BackendError from "@/errors/backendError";

const TRUTHY_VALUES = ["1", "t", "true", "y", "yes"];

export default class Mailcow extends Backend {
	sogo_visible = "1";
	constructor(app: App) {
		super(app);
		if (!("MAILCOW_API_ENDPOINT" in process.env)) {
			console.error(
				"MAILCOW_API_ENDPOINT environment variable not defined",
			);
			process.exit(1);
		}
		if (!("MAILCOW_API_KEY" in process.env)) {
			console.error("MAILCOW_API_KEY environment variable not defined");
			process.exit(1);
		}
		if ("MAILCOW_API_SOGO_VISIBLE" in process.env) {
			const val = (
				process.env.MAILCOW_API_SOGO_VISIBLE as string
			).toLowerCase();
			if (!TRUTHY_VALUES.includes(val)) {
				this.sogo_visible = "0";
			}
		}
	}
	createAlias = async (alias: string, forwardTo: string) => {
		try {
			console.log(`Creating alias ${alias} to ${forwardTo}`);
			const response = await fetch(
				`${process.env.MAILCOW_API_ENDPOINT}/api/v1/add/alias`,
				{
					method: "POST",
					body: JSON.stringify({
						active: "1",
						sogo_visible: this.sogo_visible,
						address: alias,
						goto: forwardTo,
					}),
					headers: {
						"Content-Type": "application/json",
						"X-API-Key": process.env.MAILCOW_API_KEY as string,
					},
				},
			);
			const result = (
				(await response.json()) as Record<string, unknown>[]
			)[0];
			if (
				"type" in result &&
				(result.type === "error" || result.type === "danger")
			) {
				console.error("Error while contacting backend", result.msg);
				throw new BackendError("Error from backend while processing");
			} else if ("type" in result && result.type === "success") {
				console.log(
					`Alias ${alias} to ${forwardTo} created successfully`,
				);
				return true;
			} else {
				console.error(
					"Unknown response while contacting backend",
					result,
				);
				throw new BackendError("Unknown response from backend");
			}
		} catch (e: unknown) {
			if (e instanceof BackendError) {
				throw e;
			} else {
				console.error("Unknown error while contacting backend", e);
				throw new BackendError("Unknown response from backend");
			}
		}
	};
}
