export default class BackendError extends Error {
	constructor(m: string) {
		super(m);
		this.name = "BackendError";
		Object.setPrototypeOf(this, BackendError.prototype);
	}
}
