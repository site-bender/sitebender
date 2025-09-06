export type FunctionSignature = {
	name: string
	path: string
	parameters: Array<Parameter>
	returnType: TypeInfo
	generics?: Array<Generic>
	isCurried: boolean
	isAsync: boolean
	isGenerator: boolean
	imports?: Array<{ name: string; path: string; isType: boolean; isDefault: boolean }>
}

export type Parameter = {
	name: string
	type: TypeInfo
	optional: boolean
	defaultValue?: string
}

export type TypeInfo = {
	raw: string
	kind: TypeKind
	elementType?: TypeInfo
	properties?: Record<string, TypeInfo>
	unionTypes?: Array<TypeInfo>
	literalValue?: unknown
	typeName?: string  // For custom types like Result, Option, etc.
	typeArguments?: Array<TypeInfo>  // For generic type arguments
	elements?: Array<TypeInfo>  // For tuple types
	types?: Array<TypeInfo>  // Alternative for union types
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
	Interface = "interface",  // For custom interfaces
	Tuple = "tuple",  // For tuple types
}

export type Generic = {
	name: string
	constraint?: string
}

export type BranchPath = {
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

export type TestInput = {
	description: string
	value: unknown
}

export type TestCase = {
	name: string
	description: string
	input: Array<unknown>
	expectedOutput?: unknown
	expectedError?: string
	properties?: Array<PropertyTest>
	branchCoverage?: Array<string>
}

export type PropertyTest = {
	name: string
	property: string
	generator: string
	runs?: number
}

export type TestSuite = {
	functionPath: string
	functionName: string
	testCases: Array<TestCase>
	imports: Array<string>
	coverage: CoverageResult
}

export type CoverageResult = {
	percentage: number
	lines: {
		covered: number
		total: number
		uncovered: Array<number>
	}
	branches: {
		covered: number
		total: number
		uncovered: Array<string>
	}
	suggestions?: Array<string>
	ignoredLines?: Array<IgnoredLine>
}

export type CoverageMetric = {
	total: number
	covered: number
	percentage: number
}

export type IgnoredLine = {
	line: number
	reason: string
}

import type Logger from "./Logger/index.ts"

export type GeneratorConfig = {
	maxPropertyRuns: number
	includeEdgeCases: boolean
	includePropertyTests: boolean
	includeBenchmarks: boolean
	targetCoverage: number
	logger?: Logger
}

export type TestFileMetadata = {
	sourceFile: string
	testFile: string
	generatedAt: string
	generator: string
	version: string
}
