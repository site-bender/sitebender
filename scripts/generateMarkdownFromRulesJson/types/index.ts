//++ Type definitions for generateMarkdownFromRulesJson

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonObject
	| Array<JsonValue>

export type JsonObject = {
	readonly [key: string]: JsonValue
}

export type RulesFile = {
	readonly path: string
	readonly jsonPath: string
	readonly markdownPath: string
}
