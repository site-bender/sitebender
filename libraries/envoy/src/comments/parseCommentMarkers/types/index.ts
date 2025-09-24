//++ Types for legacy line-based comment marker parser

//++ Help comment categories (uppercase in source, lowercase in types)
export type HelpCategory =
	| "EXAMPLE"
	| "SETUP"
	| "ADVANCED"
	| "GOTCHA"
	| "MIGRATION"
	| "PRO"
	| "CON"

export type ParsedHelp = {
	category?: HelpCategory
	content: string
	code?: string // For EXAMPLE category
	expected?: string // For EXAMPLE category
	line: number
	raw: string
}

export type ParsedTechDebt = { line: number; reason: string; raw: string }

export type ParsedExample = {
	code: string
	expected?: string
}

export type ParsedComments = {
	description?: string
	help: Array<ParsedHelp>
	techDebt: Array<ParsedTechDebt>
	examples: Array<ParsedExample>
	raw: Array<{ line: number; marker: string; text: string }>
	diagnostics: Array<{ line: number; issue: string }>
}

//++ Internal accumulator while scanning lines (not exported publicly by parser entry)
export type Acc = {
	idx: number
	descriptionParts: Array<string>
	haveDescription: boolean
	help: Array<ParsedHelp>
	techDebt: Array<ParsedTechDebt>
	examples: Array<ParsedExample>
	raw: Array<{ line: number; marker: string; text: string }>
	diagnostics: Array<{ line: number; issue: string }>
}
