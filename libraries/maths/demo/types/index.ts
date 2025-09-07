import type { ParseError, Result } from "../../src/types/index.ts"

// Demo result type for structured output
export type DemoResult = {
	readonly title: string
	readonly formula: string
	readonly result: Result<unknown, ParseError>
	readonly description?: string
}
