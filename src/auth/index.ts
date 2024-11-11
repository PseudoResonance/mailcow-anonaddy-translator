import config from "config";
import User from "./user";
import UnauthorizedRequestError from "@/errors/unauthorizedRequest";
import { type Request } from "express";

const getUser: (req: Request) => User = (req: Request) => {
	if (req.headers.authorization === undefined) {
		throw new UnauthorizedRequestError("Auth token not provided");
	}
	if (!req.headers.authorization.startsWith("Bearer ")) {
		throw new UnauthorizedRequestError("Auth token format invalid");
	}
	if (!config.has("users")) {
		throw new UnauthorizedRequestError("Auth token invalid");
	}
	const token = req.headers.authorization.substring(7);
	const users: Record<string, User> = config.get("users");
	if (!(token in users)) {
		throw new UnauthorizedRequestError("Auth token invalid");
	}
	return users[token];
};

export default getUser;
