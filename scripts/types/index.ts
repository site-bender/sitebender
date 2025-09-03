// Shared types for repository scripts

export type ImportInfo = {
	type: "type" | "value"
	source: string
	text: string
	line: number
	category:
		| "types"
		| "components"
		| "utilities"
		| "constants"
		| "external"
		| "local"
}

export type AliasViolation = {
	file: string
	line: number
	spec: string
	hint: string
}

export type Logger = {
	log: (...args: unknown[]) => void
	info?: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
	error: (...args: unknown[]) => void
}
