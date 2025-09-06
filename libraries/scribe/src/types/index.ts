/**
 * Type definitions for @sitebender/scribe
 */

// Result type for error handling
export type Result<T, E> =
	| { ok: true; value: T }
	| { ok: false; error: E }

// Parse error type
export type ParseError = {
	message: string
	line?: number
	column?: number
	file?: string
}

// AST node types from TypeScript compiler
export type ASTNode = {
	kind: string
	pos: number
	end: number
	[key: string]: unknown
}

// Function signature information
export type FunctionSignature = {
	name: string
	parameters: Array<Parameter>
	returnType: string
	generics?: Array<Generic>
	isAsync: boolean
	isGenerator: boolean
	isExported: boolean
	isDefault: boolean
}

// Parameter information
export type Parameter = {
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}

// Generic constraint information
export type Generic = {
	name: string
	constraint?: string
	default?: string
}

// Function properties detected from analysis
export type Properties = {
	isPure: boolean
	isCurried: boolean
	curryLevels?: number
	isIdempotent: boolean
	isCommutative: boolean
	isAssociative: boolean
	isDistributive: boolean
	complexity: ComplexityClass
	nullHandling: NullStrategy
	deterministic: boolean
}

// Complexity classes
export type ComplexityClass =
	| "O(1)"
	| "O(log n)"
	| "O(n)"
	| "O(n log n)"
	| "O(n²)"
	| "O(n³)"
	| "O(2^n)"
	| "O(n!)"
	| "Unknown"

// Null handling strategies
export type NullStrategy =
	| "throws"
	| "returns-null"
	| "returns-default"
	| "handles-gracefully"
	| "unknown"

// Example extracted from tests
export type Example = {
	code: string
	result?: string
	description?: string
	source?: string
}

// Mathematical law
export type Law = {
	name: string
	formula: string
	description?: string
}

// Complete function metadata
export type FunctionMetadata = {
	signature: FunctionSignature
	description?: string
	properties: Properties
	examples: Array<Example>
	laws: Array<Law>
	relatedFunctions: Array<string>
	since?: string
	deprecated?: string
}

// Documentation output
export type Documentation = {
	name: string
	content: string
	format: OutputFormat
	metadata: FunctionMetadata
}

// Output formats
export type OutputFormat = "markdown" | "html" | "json"

// Generation options
export type GenerateOptions = {
	format?: OutputFormat
	includeExamples?: boolean
	includeProperties?: boolean
	includeBenchmarks?: boolean
	includeRelated?: boolean
	examplesPath?: string
}

// Parser context for tracking state
export type ParserContext = {
	sourceFile: string
	content: string
	ast?: ASTNode
	errors: Array<ParseError>
}
