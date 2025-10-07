// @sitebender/arborist/src/types
// Core type definitions for Arborist AST parsing
// All types copied from contract.ts and made available for internal use

import type { Module } from "npm:@swc/wasm-web@1.13.20"

//++ Wrapper around SWC Module with source metadata
//++ This is the primary AST type returned by parseFile
export type ParsedAst = Readonly<{
	module: Module
	sourceText: string
	filePath: string
}>

//++ Position in source file (1-based line and column numbers)
export type Position = Readonly<{
	line: number
	column: number
}>

//++ Byte span in source file (absolute offsets)
export type Span = Readonly<{
	start: number
	end: number
}>

//++ Function parameter information
export type Parameter = Readonly<{
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}>

//++ Type parameter (generic) information
export type TypeParameter = Readonly<{
	name: string
	constraint?: string
	default?: string
}>

//++ Function modifiers and flags
export type FunctionModifiers = Readonly<{
	isExported: boolean
	isDefault: boolean
	isAsync: boolean
	isGenerator: boolean
	isArrow: boolean
}>

//++ Function body analysis results
export type FunctionBody = Readonly<{
	hasReturn: boolean
	hasThrow: boolean
	hasAwait: boolean
	hasTryCatch: boolean
	hasLoops: boolean
	cyclomaticComplexity: number
}>

//++ Parsed function with all metadata
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

//++ Import binding (imported name and local alias)
export type ImportBinding = Readonly<{
	imported: string
	local: string
	isType: boolean
}>

//++ Parsed import statement
export type ParsedImport = Readonly<{
	specifier: string
	position: Position
	span: Span
	kind: "default" | "named" | "namespace" | "type"
	imports: ReadonlyArray<ImportBinding>
}>

//++ Parsed export statement
export type ParsedExport = Readonly<{
	name: string
	position: Position
	span: Span
	kind: "default" | "named" | "reexport"
	isType: boolean
	source?: string
}>

//++ Envoy marker types (documentation annotations)
export type EnvoyMarker =
	| Readonly<{ marker: "++"; description: string }>
	| Readonly<{ marker: "--"; techDebt: string }>
	| Readonly<{ marker: "!!"; critical: string }>
	| Readonly<{ marker: "??"; help: string }>
	| Readonly<{ marker: ">>"; link: string }>

//++ Parsed comment with optional Envoy marker
export type ParsedComment = Readonly<{
	text: string
	position: Position
	span: Span
	kind: "line" | "block"
	envoyMarker?: EnvoyMarker
	associatedNode?: string
}>

//++ Parsed type alias or interface
export type ParsedType = Readonly<{
	name: string
	position: Position
	span: Span
	definition: string
	isExported: boolean
}>

//++ Parsed constant declaration
export type ParsedConstant = Readonly<{
	name: string
	position: Position
	span: Span
	type: string
	value?: string
	isExported: boolean
}>

//++ Violation detection results
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

//++ Complete parsed file with all extracted information
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

//++ Export all error types from errors/index.ts
export type {
	CommentExtractionError,
	ConstantExtractionError,
	ExportExtractionError,
	ExtractionError,
	FunctionExtractionError,
	ImportExtractionError,
	ParseError,
	TypeExtractionError,
	ViolationDetectionError,
} from "./errors/index.ts"
