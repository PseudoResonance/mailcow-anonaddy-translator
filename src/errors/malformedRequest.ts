export default class MalformedRequestError extends Error {
	constructor(m: string) {
		super(m);
		this.name = "MalformedRequestError";
		Object.setPrototypeOf(this, MalformedRequestError.prototype);
	}
}
