/**
 * Type definitions for @sitebender/envoy
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

// Output format options
export type OutputFormat = "markdown" | "html" | "json"

// Generation options
export type GenerateOptions = {
	format?: OutputFormat
	includeExamples?: boolean
	includeLaws?: boolean
	includeComplexity?: boolean
}

// Linguist Output Types - What Linguist provides to Envoy
export type LinguistOutput = {
	readonly functions: ReadonlyArray<ParsedFunction>
	readonly comments: ReadonlyArray<ParsedComment>
}

export type ParsedFunction = {
	readonly node: unknown // TypeScript AST node - Envoy doesn't need to know the type
	readonly signature: LinguistFunctionSignature
	readonly metadata: TraversalMetadata
}

export type LinguistFunctionSignature = {
	readonly name: string
	readonly filePath: string
	readonly parameters: ReadonlyArray<LinguistParameter>
	readonly returnType: LinguistTypeInfo
	readonly generics?: ReadonlyArray<LinguistGeneric>
	readonly isAsync: boolean
	readonly isGenerator: boolean
	readonly isCurried: boolean
	readonly isPure: boolean
	readonly isExported: boolean
	readonly isDefault: boolean
}

export type LinguistParameter = {
	readonly name: string
	readonly type: LinguistTypeInfo
	readonly isOptional: boolean
	readonly isRest: boolean
	readonly defaultValue?: string
}

export type LinguistTypeInfo = {
	readonly raw: string
	readonly kind:
		| "primitive"
		| "array"
		| "object"
		| "function"
		| "union"
		| "intersection"
		| "generic"
		| "literal"
		| "unknown"
		| "any"
		| "void"
		| "never"
		| "null"
		| "undefined"
}

export type LinguistGeneric = {
	readonly name: string
	readonly constraint?: string
	readonly default?: string
}

export type TraversalMetadata = {
	readonly hasThrowStatements: boolean
	readonly hasAwaitExpressions: boolean
	readonly hasGlobalAccess: boolean
	readonly cyclomaticComplexity: number
	readonly hasReturnStatements: boolean
	readonly hasIfStatements?: boolean
	readonly hasLoops?: boolean
	readonly hasTryCatch?: boolean
	readonly parameterCount?: number
	readonly isArrowFunction?: boolean
	readonly isAsync?: boolean
	readonly isGenerator?: boolean
	readonly nestingDepth?: number
}

export type ParsedComment = {
	readonly kind: "line" | "block"
	readonly text: string // Trimmed content
	readonly fullText: string // Original with markers
	readonly type: "description" | "example" | "gotcha" | "pro" | "law"
	readonly position: "before" | "after"
}

// Legacy types for existing code compatibility
export type ASTNode = {
	kind: string
	pos: number
	end: number
	[key: string]: unknown
}

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

export type Parameter = {
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}

export type Generic = {
	name: string
	constraint?: string
	default?: string
}

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

export type NullStrategy =
	| "throws"
	| "returns-null"
	| "returns-default"
	| "handles-gracefully"
	| "unknown"

export type Example = {
	code: string
	result?: string
	description?: string
	source?: string
}

export type Law = {
	name: string
	formula?: string
	description: string
}

export type FunctionMetadata = {
	signature: FunctionSignature
	description: string
	properties: Properties
	examples: Array<Example>
	laws: Array<Law>
	relatedFunctions: Array<string>
}

export type Documentation = {
	name: string
	content: string
	format: OutputFormat
	metadata: FunctionMetadata
}

export type LinguistContext = {
	filePath: string
	sourceCode: string
}
