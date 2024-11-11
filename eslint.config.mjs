// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["src/**/*.{js,mjs,cjs,ts}"],
		plugins: {
			eslint,
			tseslint,
		},
		languageOptions: {
			parserOptions: {
				project: true,
			},
			parser: tseslint.parser,
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@/prefer-template": "error",
		},
	},
];
