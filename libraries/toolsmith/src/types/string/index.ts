export type ReplacerFunction = (
	substring: string,
	...args: Array<string | number>
) => string

export type CaseConverter = (s: string) => string

export type CaseType =
	| "camel" // camelCase - firstName
	| "kebab" // kebab-case - first-name
	| "lower" // lowercase - first name
	| "lowerFirst" // lowercase first letter - lOWER
	| "pascal" // PascalCase - FirstName
	| "sentence" // Sentence case - First name
	| "snake" // snake_case - first_name
	| "SNAKE" // SCREAMING_SNAKE_CASE - FIRST_NAME
	| "title" // Title Case - First Name
	| "train" // Train-Case - First-Name
	| "upper" // UPPERCASE - FIRST NAME
	| "upperFirst" // UPPERCASE first letter - Upper
