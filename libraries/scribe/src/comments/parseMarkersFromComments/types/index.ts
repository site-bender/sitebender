//++ Types for marker parsing adapter

export type RawComment = {
	kind: 'line' | 'block'
	text: string
	fullText: string
	start: number
	end: number
	line: number
	column: number
	nodeId?: string
}

export type DiagnosticCategory = 'structure' | 'association' | 'quality' | 'consistency' | 'hygiene' | 'semantic'
export type DiagnosticSeverity = 'info' | 'warn' | 'error'

export type Diagnostic = {
	code: string
	category: DiagnosticCategory
	message: string
	line: number
	column?: number
	functionName?: string
	severity: DiagnosticSeverity
	suggestion?: string
}

export type ParsedExample = {
	code: string
	expected?: string
	line: number
	raw: string
	functionName?: string
}

export type ParsedTechDebt = {
	line: number
	reason: string
	raw: string
	functionName?: string
}

export type ParsedMarkerResult = {
	description?: string
	examples: Array<ParsedExample>
	techDebt: Array<ParsedTechDebt>
	diagnostics: Array<Diagnostic>
}
