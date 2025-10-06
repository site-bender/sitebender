import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

//++ Structured validation error following "help, don't scold" philosophy - explains system limitations with actionable guidance
type ValidationError = {
	// Machine identification
	code: string
	field: string

	// Human messages (both for i18n flexibility)
	messages: Array<string>
	messageKeys?: ReadonlyArray<string>

	// Required context (what system needs)
	received: Serializable
	expected: string
	suggestion: string

	// Optional helpful context
	examples?: ReadonlyArray<Serializable>
	constraints?: Readonly<Record<string, Serializable>>

	// Location context (for nested object validation)
	path?: ReadonlyArray<string>

	// Severity (describes system limitation severity)
	severity: "info" | "notice" | "requirement"

	// i18n support (Linguist integration)
	locale?: string
	interpolation?: Readonly<Record<string, Serializable>>

	// Optional documentation
	helpUrl?: string
}

export type { ValidationError }
export default ValidationError
