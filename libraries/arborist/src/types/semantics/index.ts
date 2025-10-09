// @sitebender/arborist/src/types/semantic
// Semantic analysis types for deno_ast integration

import type { Diagnostic } from "deno_ast"
import type { ParsedFile } from "../index.ts"

//++ Symbol information from semantic analysis
export type SymbolInfo = Readonly<{
	name: string
	kind: "function" | "variable" | "type" | "class" | "interface"
	type: string
	isExported: boolean
	definition?: SourceLocation
	references: ReadonlyArray<SourceLocation>
}>

//++ Source location with file information
export type SourceLocation = Readonly<{
	file: string
	line: number
	column: number
	start: number
	end: number
}>

//++ Mathematical properties for functions
export type MathematicalProperties = Readonly<{
	commutative?: boolean
	associative?: boolean
	idempotent?: boolean
	distributive?: boolean
	invertible?: boolean
}>

//++ Complexity metrics
export type ComplexityMetrics = Readonly<{
	cyclomatic: number
	cognitive: number
	halstead: {
		volume: number
		difficulty: number
		effort: number
	}
}>

//++ Purity analysis results
export type PurityAnalysis = Readonly<{
	isPure: boolean
	reasons: ReadonlyArray<string>
	sideEffects: ReadonlyArray<string>
}>

//++ Complete semantic information
export type SemanticInfo = Readonly<{
	inferredTypes: ReadonlyMap<string, string>
	purity: PurityAnalysis
	complexity: ComplexityMetrics
	mathematicalProperties: MathematicalProperties
	symbolTable: ReadonlyMap<string, SymbolInfo>
	diagnostics: ReadonlyArray<Diagnostic>
	typeDependencies: ReadonlyMap<string, ReadonlyArray<string>>
}>

//++ Enhanced AST with semantic information
export type SemanticAst = Readonly<{
	module: unknown // deno_ast Program type
	sourceText: string
	filePath: string
	semanticInfo: SemanticInfo
}>

//++ Complete parsed file with semantic information
export type SemanticFile = ParsedFile & { semanticInfo: SemanticInfo }
