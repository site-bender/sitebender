/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: ["*.md"],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
	arrowParens: "avoid",
	bracketSameLine: false,
	bracketSpacing: true,
	proseWrap: "always",
	quoteProps: "consistent",
	semi: false,
	singleAttributePerLine: true,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,
	printWidth: 80,
}
