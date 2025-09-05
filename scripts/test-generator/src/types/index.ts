export interface FunctionSignature {
	name: string
	path: string
	parameters: Array<Parameter>
	returnType: TypeInfo
	generics?: Array<Generic>
	isCurried: boolean
	isAsync: boolean
	isGenerator: boolean
}

export interface Parameter {
	name: string
	type: TypeInfo
	optional: boolean
	defaultValue?: string
}

export interface TypeInfo {
	raw: string
	kind: TypeKind
	elementType?: TypeInfo
	properties?: Record<string, TypeInfo>
	unionTypes?: Array<TypeInfo>
	literalValue?: unknown
}

export enum TypeKind {
	Primitive = "primitive",
	Array = "array",
	Object = "object",
	Function = "function",
	Union = "union",
	Intersection = "intersection",
	Generic = "generic",
	Literal = "literal",
	Unknown = "unknown",
}

export interface Generic {
	name: string
	constraint?: string
}

export interface BranchPath {
	id: string
	condition: string
	line: number
	column: number
	type: BranchType
	requiredInputs: Array<TestInput>
}

export enum BranchType {
	If = "if",
	Else = "else",
	ElseIf = "elseif",
	Ternary = "ternary",
	Switch = "switch",
	NullCheck = "nullcheck",
	TryCatch = "trycatch",
	LogicalAnd = "logicaland",
	LogicalOr = "logicalor",
}

export interface TestInput {
	description: string
	value: unknown
}

export interface TestCase {
	name: string
	description: string
	input: Array<unknown>
	expectedOutput?: unknown
	expectedError?: string
	properties?: Array<PropertyTest>
	branchCoverage?: Array<string>
}

export interface PropertyTest {
	name: string
	property: string
	generator: string
	runs?: number
}

export interface TestSuite {
	functionPath: string
	functionName: string
	testCases: Array<TestCase>
	imports: Array<string>
	coverage: CoverageResult
}

export interface CoverageResult {
	percentage: number
	lines: CoverageMetric
	branches: CoverageMetric
	functions: CoverageMetric
	uncoveredLines: Array<number>
	uncoveredBranches: Array<string>
	ignoredLines: Array<IgnoredLine>
}

export interface CoverageMetric {
	total: number
	covered: number
	percentage: number
}

export interface IgnoredLine {
	line: number
	reason: string
}

export interface GeneratorConfig {
	maxPropertyRuns: number
	includeEdgeCases: boolean
	includePropertyTests: boolean
	includeBenchmarks: boolean
	targetCoverage: number
}

export interface TestFileMetadata {
	sourceFile: string
	testFile: string
	generatedAt: string
	generator: string
	version: string
}