import App from "@/app";
import getUser from "@/auth";
import User from "@/auth/user";
import BackendError from "@/errors/backendError";
import MalformedRequestError from "@/errors/malformedRequest";
import UnauthorizedRequestError from "@/errors/unauthorizedRequest";
import express, { Router, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";

export default (app: App) => {
	const router: Router = express.Router();

	const RANDOM_CHARACTERS_LENGTH = 16;
	const VALID_FORMATS = ["random_characters", "uuid", "custom"];

	/**
	 * Create new alias
	 */
	router.post("/", async (req: Request, res: Response) => {
		try {
			const user: User = getUser(req);
			if (!("application/json" == req.headers["content-type"])) {
				throw new MalformedRequestError("Invalid Content-Type");
			}
			if (!("domain" in req.body)) {
				throw new MalformedRequestError("Missing domain");
			}
			if (
				"format" in req.body &&
				!VALID_FORMATS.includes(req.body.format)
			) {
				throw new MalformedRequestError(
					`Invalid format ${req.body.format}`,
				);
			}
			let alias = "";
			switch (
				"format" in req.body
					? (req.body.format as string).toLowerCase()
					: ""
			) {
				case "random_characters":
					alias = [...Array(RANDOM_CHARACTERS_LENGTH)]
						.map(() => Math.random().toString(36)[2])
						.join("");
					break;
				case "custom":
					if (!("local_part" in req.body)) {
						throw new MalformedRequestError(
							"Missing local_part for custom alias",
						);
					}
					alias = req.body.local_part;
					break;
				case "uuid":
				default:
					alias = uuidv4();
					break;
			}
			const result = await app.backend.createAlias(
				`${alias}@${req.body.domain}`,
				user.email,
			);
			if (!result) {
				throw new BackendError("Failed to create alias");
			} else {
				res.status(201).send({
					data: {
						local_part: alias,
						domain: req.body.domain,
						email: `${alias}@${req.body.domain}`,
						active: true,
						description:
							"description" in req.body
								? req.body.description
								: null,
					},
				});
			}
		} catch (e: unknown) {
			console.error(
				`Error handling ${req.method} to ${req.originalUrl}:`,
				e,
			);
			if (typeof e === "string") {
				res.status(500).send({ error: e });
			} else if (e instanceof Error) {
				if (e instanceof UnauthorizedRequestError) {
					res.status(401).send({ error: e.name, message: e.message });
				} else {
					res.status(500).send({ error: e.name, message: e.message });
				}
			}
		}
	});

	/**
	 * Get all aliases
	 */
	// router.get("/", async (req: Request, res: Response) => {
	// 	try {
	// 		if (!("application/json" == req.headers["content-type"])) {
	// 			throw new MalformedRequestError("Invalid Content-Type");
	// 		}
	// 		res.send({
	// 			data: [
	// 				{
	// 					id: "50c9e585-e7f5-41c4-9016-9014c15454bc",
	// 					user_id: "ca0a4e09-c266-4f6f-845c-958db5090f09",
	// 					aliasable_id: null,
	// 					aliasable_type: null,
	// 					local_part: "first",
	// 					extension: null,
	// 					domain: "johndoe.anonaddy.com",
	// 					email: "first@johndoe.anonaddy.com",
	// 					active: true,
	// 					description: null,
	// 					from_name: null,
	// 					emails_forwarded: 5,
	// 					emails_blocked: 0,
	// 					emails_replied: 0,
	// 					emails_sent: 0,
	// 					recipients: [],
	// 					last_forwarded: "2019-10-01 09:00:00",
	// 					last_blocked: null,
	// 					last_replied: null,
	// 					last_sent: null,
	// 					created_at: "2019-10-01 09:00:00",
	// 					updated_at: "2019-10-01 09:00:00",
	// 					deleted_at: null,
	// 				},
	// 				{
	// 					id: "c549db7d-5fac-4b09-9443-9e47f644d29f",
	// 					user_id: "ca0a4e09-c266-4f6f-845c-958db5090f09",
	// 					domain_id: null,
	// 					local_part: "second",
	// 					extension: null,
	// 					domain: "johndoe.anonaddy.com",
	// 					email: "second@johndoe.anonaddy.com",
	// 					active: true,
	// 					description: null,
	// 					from_name: null,
	// 					emails_forwarded: 2,
	// 					emails_blocked: 1,
	// 					emails_replied: 0,
	// 					emails_sent: 0,
	// 					recipients: [],
	// 					last_forwarded: "2019-10-01 09:00:00",
	// 					last_blocked: null,
	// 					last_replied: null,
	// 					last_sent: null,
	// 					created_at: "2019-10-01 09:00:00",
	// 					updated_at: "2019-10-01 09:00:00",
	// 					deleted_at: null,
	// 				},
	// 			],
	// 			links: {
	// 				first: "https://app.addy.io/api/v1/aliases?filter%5Bdeleted%5D=with&filter%5Bsearch%5D=johndoe&page%5Bsize%5D=10&page%5Bnumber%5D=1",
	// 				last: "https://app.addy.io/api/v1/aliases?filter%5Bdeleted%5D=with&filter%5Bsearch%5D=johndoe&page%5Bsize%5D=10&page%5Bnumber%5D=1",
	// 				prev: null,
	// 				next: null,
	// 			},
	// 			meta: {
	// 				current_page: 1,
	// 				from: 1,
	// 				last_page: 1,
	// 				links: [
	// 					{
	// 						url: null,
	// 						label: "&laquo; Previous",
	// 						active: false,
	// 					},
	// 					{
	// 						url: "https://app.addy.io/api/v1/aliases?filter%5Bdeleted%5D=with&filter%5Bsearch%5D=johndoe&page%5Bsize%5D=10&page%5Bnumber%5D=1",
	// 						label: "1",
	// 						active: true,
	// 					},
	// 					{
	// 						url: null,
	// 						label: "Next &raquo;",
	// 						active: false,
	// 					},
	// 				],
	// 				path: "https://app.addy.io/api/v1/aliases",
	// 				per_page: 10,
	// 				to: 2,
	// 				total: 2,
	// 			},
	// 		});
	// 	} catch (e: unknown) {
	// 		console.error(`Error handling ${req.method} to ${req.originalUrl}:`, e);
	// 		if (typeof e === "string") {
	// 			res.status(500).send({ error: e });
	// 		} else if (e instanceof Error) {
	// 			res.status(500).send({ error: e.name, message: e.message });
	// 		}
	// 	}
	// });

	return router;
};
