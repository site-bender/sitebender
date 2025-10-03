//++ Arborist Warden Contract v1.0.0
// This contract defines the formal API that Arborist provides to consumers
// and the guarantees it makes about behavior, performance, and correctness.

// Result and Maybe types defined locally for contract independence
type Result<T, E> =
	| Readonly<{ _tag: "ok"; value: T }>
	| Readonly<{ _tag: "error"; error: E }>

type Maybe<T> =
	| Readonly<{ _tag: "just"; value: T }>
	| Readonly<{ _tag: "nothing" }>

// ============================================================================
// Core Types
// ============================================================================

export type Position = Readonly<{
	line: number // 1-based line number
	column: number // 1-based column number
}>

export type Span = Readonly<{
	start: number // Absolute byte offset from file start
	end: number // Absolute byte offset from file start
}>

export type Parameter = Readonly<{
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}>

export type TypeParameter = Readonly<{
	name: string
	constraint?: string
	default?: string
}>

export type FunctionModifiers = Readonly<{
	isExported: boolean
	isDefault: boolean
	isAsync: boolean
	isGenerator: boolean
	isArrow: boolean
}>

export type FunctionBody = Readonly<{
	hasReturn: boolean
	hasThrow: boolean
	hasAwait: boolean
	hasTryCatch: boolean
	hasLoops: boolean
	cyclomaticComplexity: number
}>

export type ParsedFunction = Readonly<{
	name: string
	position: Position
	span: Span
	parameters: ReadonlyArray<Parameter>
	returnType: string
	typeParameters: ReadonlyArray<TypeParameter>
	modifiers: FunctionModifiers
	body: FunctionBody
}>

export type ImportBinding = Readonly<{
	imported: string
	local: string
	isType: boolean
}>

export type ParsedImport = Readonly<{
	specifier: string
	position: Position
	span: Span
	kind: "default" | "named" | "namespace" | "type"
	imports: ReadonlyArray<ImportBinding>
}>

export type ParsedExport = Readonly<{
	name: string
	position: Position
	span: Span
	kind: "default" | "named" | "reexport"
	isType: boolean
	source?: string
}>

export type EnvoyMarker =
	| Readonly<{ marker: "++"; description: string }>
	| Readonly<{ marker: "--"; techDebt: string }>
	| Readonly<{ marker: "!!"; critical: string }>
	| Readonly<{ marker: "??"; help: string }>
	| Readonly<{ marker: ">>"; link: string }>

export type ParsedComment = Readonly<{
	text: string
	position: Position
	span: Span
	kind: "line" | "block"
	envoyMarker?: EnvoyMarker
	associatedNode?: string
}>

export type ParsedType = Readonly<{
	name: string
	position: Position
	span: Span
	definition: string
	isExported: boolean
}>

export type ParsedConstant = Readonly<{
	name: string
	position: Position
	span: Span
	type: string
	value?: string
	isExported: boolean
}>

export type ViolationInfo = Readonly<{
	hasArrowFunctions: boolean
	arrowFunctions: ReadonlyArray<Position>
	hasClasses: boolean
	classes: ReadonlyArray<Position>
	hasThrowStatements: boolean
	throwStatements: ReadonlyArray<Position>
	hasTryCatch: boolean
	tryCatchBlocks: ReadonlyArray<Position>
	hasLoops: boolean
	loops: ReadonlyArray<Position>
	hasMutations: boolean
	mutations: ReadonlyArray<Position>
}>

export type ParsedFile = Readonly<{
	filePath: string
	functions: ReadonlyArray<ParsedFunction>
	types: ReadonlyArray<ParsedType>
	constants: ReadonlyArray<ParsedConstant>
	imports: ReadonlyArray<ParsedImport>
	exports: ReadonlyArray<ParsedExport>
	comments: ReadonlyArray<ParsedComment>
	violations: ViolationInfo
}>

export type ParseError = Readonly<{
	_tag: "ParseError"
	message: string
	file: string
	line?: number
	column?: number
}>

// ============================================================================
// Public API Contract
// ============================================================================

export type ArboristAPI = Readonly<{
	//++ Parse a TypeScript file and return structured data
	parseFile: (filePath: string) => Promise<Result<ParsedFile, ParseError>>

	//++ Parse TypeScript source string
	parseString: (
		source: string,
		fileName: string,
	) => Result<ParsedFile, ParseError>

	//++ Parse multiple files in parallel
	parseProject: (
		rootPath: string,
		pattern: string,
	) => Promise<Result<ReadonlyArray<ParsedFile>, ParseError>>

	//++ Check if function is arrow function
	isArrowFunction: (func: ParsedFunction) => boolean

	//++ Check if function is exported
	isExported: (func: ParsedFunction) => boolean

	//++ Get function at position
	getFunctionAtPosition: (
		file: ParsedFile,
		position: Position,
	) => Maybe<ParsedFunction>

	//++ Get comment for function
	getCommentForFunction: (
		file: ParsedFile,
		functionName: string,
	) => Maybe<ParsedComment>
}>

// ============================================================================
// Guarantees
// ============================================================================

export type ArboristGuarantees = Readonly<{
	//++ All functions are pure (no side effects except file I/O at boundaries)
	purity: "pure"

	//++ Performance targets for parsing
	performance: Readonly<{
		smallFiles: "< 5ms for files < 100 lines"
		mediumFiles: "< 20ms for files 100-500 lines"
		largeFiles: "< 50ms for files 500-2000 lines"
		hugeFiles: "< 200ms for files > 2000 lines"
	}>

	//++ Error handling via Result monad, never throws exceptions
	errorHandling: "Result<T, ParseError>"

	//++ All outputs are immutable
	immutability: "Readonly types everywhere"

	//++ Test coverage
	coverage: "100% line and branch coverage"

	//++ No external dependencies except deno_ast
	dependencies: "deno_ast only"
}>

// ============================================================================
// Requirements from Consumers
// ============================================================================

export type ArboristRequirements = Readonly<{
	//++ File must exist and be readable
	validFilePath: "File must exist with read permissions"

	//++ Source must be parseable TypeScript or JavaScript
	validSource: "Valid TS/JS syntax"

	//++ Consumers must handle Result type
	errorHandling: "Must use matchResult or similar to handle errors"
}>

// ============================================================================
// Contract Version and Signature
// ============================================================================

export type ArboristContract = Readonly<{
	version: "1.0.0"
	library: "@sitebender/arborist"
	api: ArboristAPI
	guarantees: ArboristGuarantees
	requirements: ArboristRequirements
	signedBy: "warden"
	signedAt: string // ISO 8601 timestamp
	hash: string // SHA-256 of this contract
}>

//++ Contract instance (to be signed by Warden)
export const contract: ArboristContract = {
	version: "1.0.0",
	library: "@sitebender/arborist",
	api: {} as ArboristAPI, // Implemented by library
	guarantees: {
		purity: "pure",
		performance: {
			smallFiles: "< 5ms for files < 100 lines",
			mediumFiles: "< 20ms for files 100-500 lines",
			largeFiles: "< 50ms for files 500-2000 lines",
			hugeFiles: "< 200ms for files > 2000 lines",
		},
		errorHandling: "Result<T, ParseError>",
		immutability: "Readonly types everywhere",
		coverage: "100% line and branch coverage",
		dependencies: "deno_ast only",
	},
	requirements: {
		validFilePath: "File must exist with read permissions",
		validSource: "Valid TS/JS syntax",
		errorHandling: "Must use matchResult or similar to handle errors",
	},
	signedBy: "warden",
	signedAt: "", // Set by Warden on signing
	hash: "", // Set by Warden on signing
}
