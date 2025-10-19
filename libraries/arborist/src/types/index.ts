// @sitebender/arborist/src/types
// Core type definitions for Arborist AST parsing
// All types copied from contract.ts and made available for internal use

import type { Module } from "npm:@swc/wasm-web@1.13.20"

//++ ============================================================================
//++ SWC AST Node Types
//++ ============================================================================
//++ These types represent the structure of AST nodes returned by SWC parser
//++ SWC is a Rust-based parser compiled to WASM that doesn't export TS types
//++ We define them here based on the actual runtime structure

//++ Base identifier type used throughout AST
export type SwcIdentifier = Readonly<{
	value: string
}>

//++ SWC span in AST nodes
export type SwcSpan = Readonly<{
	start: number
	end: number
}>

//++ Type annotation wrapper (contains the actual type node)
export type SwcTypeAnnotation = Readonly<{
	typeAnnotation: unknown
}>

//++ TypeScript property signature in interface/type literal
export type TsPropertySignature = Readonly<{
	type: "TsPropertySignature"
	key: SwcIdentifier
	typeAnnotation?: SwcTypeAnnotation
	optional: boolean
	readonly: boolean
}>

//++ TypeScript method signature in interface
export type TsMethodSignature = Readonly<{
	type: "TsMethodSignature"
	key: SwcIdentifier
	params: ReadonlyArray<SwcFnParam>
	typeAnnotation?: SwcTypeAnnotation
}>

//++ Union of all TypeScript type element kinds
export type TsTypeElement = TsPropertySignature | TsMethodSignature

//++ Function/method parameter
export type SwcFnParam = Readonly<{
	pat: SwcIdentifier
	typeAnnotation?: SwcTypeAnnotation
}>

//++ Type parameter (generic parameter)
export type TsTypeParameter = Readonly<{
	name: SwcIdentifier
	constraint?: unknown
	default?: unknown
}>

//++ Type parameters declaration (generics wrapper)
export type TsTypeParamDecl = Readonly<{
	params: ReadonlyArray<TsTypeParameter>
}>

//++ Interface body (contains members)
export type TsInterfaceBody = Readonly<{
	body: ReadonlyArray<TsTypeElement>
}>

//++ Interface extends expression
export type TsExpressionWithTypeArguments = Readonly<{
	expression: SwcIdentifier
	typeParams?: Readonly<{
		params: ReadonlyArray<unknown>
	}>
}>

//++ TypeScript interface declaration
export type TsInterfaceDeclaration = Readonly<{
	type: "TsInterfaceDeclaration"
	id: SwcIdentifier
	body: TsInterfaceBody
	typeParams?: TsTypeParamDecl
	extends?: ReadonlyArray<TsExpressionWithTypeArguments>
	span?: SwcSpan
}>

//++ TypeScript type alias declaration
export type TsTypeAliasDeclaration = Readonly<{
	type: "TsTypeAliasDeclaration"
	id: SwcIdentifier
	typeAnnotation: unknown
	typeParams?: TsTypeParamDecl
	span?: SwcSpan
}>

//++ Union of all type declaration nodes
export type TsTypeDeclaration = TsInterfaceDeclaration | TsTypeAliasDeclaration

//++ Export declaration wrapper (wraps exported types)
export type ExportDeclaration = Readonly<{
	type: "ExportDeclaration"
	declaration: TsTypeDeclaration
	span?: SwcSpan
}>

//++ Union of type declaration or export wrapper
export type TypeDeclarationNode = TsTypeDeclaration | ExportDeclaration

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

//++ Parsed class with all metadata
export type ParsedClass = Readonly<{
	name: string
	position: Position
	span: Span
	isExported: boolean
	isDefault: boolean
	isAbstract: boolean
	extends: string | undefined  // Parent class name
	implements: ReadonlyArray<string>  // Interface names
	members: ReadonlyArray<ClassMember>
}>

//++ Class member information
export type ClassMember = Readonly<{
	type: "constructor" | "method" | "property" | "getter" | "setter"
	name: string
	position: Position
	span: Span
	isStatic: boolean
	isPrivate: boolean
	isProtected: boolean
	isAsync: boolean  // For methods
	parameters: ReadonlyArray<Parameter>  // For methods/constructor
	returnType: string | undefined  // For methods
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
	classes: ReadonlyArray<ParsedClass>
	violations: ViolationInfo
}>

//++ Export all error types from errors/index.ts
export type {
	ClassExtractionError,
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
