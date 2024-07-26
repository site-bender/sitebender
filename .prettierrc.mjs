/** @type {import("prettier").Config} */
export default {
	arrowParens: "avoid",
	bracketSameLine: false,
	bracketSpacing: true,
	overrides: [
		{
			files: ["*.md"],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
	proseWrap: "always",
	quoteProps: "consistent",
	semi: false,
	singleAttributePerLine: true,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,
}
