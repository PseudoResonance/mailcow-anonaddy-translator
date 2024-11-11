import App from "@/app";

export default class Backend {
	app: App;
	constructor(app: App) {
		this.app = app;
	}
	createAlias: (
		alias: string,
		forwardTo: string,
		comment: string,
	) => Promise<boolean> = async () => false;
}
