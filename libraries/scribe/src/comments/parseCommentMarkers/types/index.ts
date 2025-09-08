//++ Types for legacy line-based comment marker parser
export type ParsedExample = { code: string; expected?: string; line: number; raw: string }
export type ParsedTechDebt = { line: number; reason: string; raw: string }
export type ParsedComments = {
	description?: string
	examples: Array<ParsedExample>
	techDebt: Array<ParsedTechDebt>
	raw: Array<{ line: number; marker: string; text: string }>
	diagnostics: Array<{ line: number; issue: string }>
}

//++ Internal accumulator while scanning lines (not exported publicly by parser entry)
export type Acc = {
	idx: number
	descriptionParts: Array<string>
	haveDescription: boolean
	examples: Array<ParsedExample>
	techDebt: Array<ParsedTechDebt>
	raw: Array<{ line: number; marker: string; text: string }>
	diagnostics: Array<{ line: number; issue: string }>
}
