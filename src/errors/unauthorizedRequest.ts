export default class UnauthorizedRequestError extends Error {
	constructor(m: string) {
		super(m);
		this.name = "UnauthorizedRequestError";
		Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
	}
}
