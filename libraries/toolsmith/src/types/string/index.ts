//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ReplacerFunction = (
	substring: string,
	...args: Array<string | number>
) => string

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type CaseConverter = (s: string) => string

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type CaseType =
	| "camel" // camelCase - firstName
	| "kebab" // kebab-case - first-name
	| "lower" // lowercase - first name
	| "pascal" // PascalCase - FirstName
	| "sentence" // Sentence case - First name
	| "snake" // snake_case - first_name
	| "SNAKE" // SCREAMING_SNAKE_CASE - FIRST_NAME
	| "title" // Title Case - First Name
	| "train" // Train-Case - First-Name
	| "upper" // UPPERCASE - FIRST NAME
