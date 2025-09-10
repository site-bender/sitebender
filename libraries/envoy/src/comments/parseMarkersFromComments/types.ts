// Types & constants for parseMarkersFromComments adapter (structural only)

export type RawComment = {
	kind: "line" | "block"
	text: string
	fullText: string
	start: number
	end: number
	line: number
	column: number
	nodeId?: string
}

export type DiagnosticCategory =
	| "structure"
	| "association"
	| "quality"
	| "consistency"
	| "hygiene"
	| "semantic"
export type DiagnosticSeverity = "info" | "warn" | "error"

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
	examples: ParsedExample[]
	techDebt: ParsedTechDebt[]
	diagnostics: Diagnostic[]
}

export const DIAGNOSTIC = {
	EXTRA_DESCRIPTION: "COMMENT_EXTRA_DESCRIPTION",
	UNTERMINATED_BLOCK: "COMMENT_UNTERMINATED_BLOCK",
	EMPTY_TECHDEBT: "TECHDEBT_EMPTY_REASON",
	EMPTY_EXAMPLE_BLOCK: "EXAMPLE_EMPTY_BLOCK",
	AMBIGUOUS_COMMENT: "COMMENT_AMBIGUOUS_UNASSOCIATED",
} as const
