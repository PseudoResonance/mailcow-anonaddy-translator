const { writeFile } = require("fs/promises");
const { exec } = require("child_process");

const outputDir = "build/esbuild";

function cleanPkgJson(json) {
	delete json.devDependencies;
	delete json["release-it"];
	delete json.optionalDependencies;
	delete json.dependencies;
	delete json.pkg.scripts;
	return json;
}

async function main() {
	// create main patched packege.json
	const pkgJson = require("./package.json");
	cleanPkgJson(pkgJson);

	pkgJson.scripts = {
		start: "node index.cjs",
	};

	pkgJson.bin = "index.cjs";
	pkgJson.main = "index.cjs";
	pkgJson.pkg.assets = ["index.cjs"];

	await writeFile(
		`${outputDir}/package.json`,
		JSON.stringify(pkgJson, null, 2),
	);

	exec(`pkg ./${outputDir}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`${stderr}`);
			return;
		}
		console.log(`${stdout}`);
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
