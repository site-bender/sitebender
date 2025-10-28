// @sitebender/arborist/src/types/errors
// Error type definitions using Artificer ArchitectError pattern

import type { ArchitectError } from "@sitebender/artificer/errors/types/ArchitectError.ts"

import type { Span, ParsedAst } from "../index.ts"

//++ Parse error from parseFile operation
//++ Discriminated by kind field for specific error handling
export type ParseError = ArchitectError<"parseFile", [string]> & {
	readonly kind:
		| "FileNotFound"
		| "InvalidSyntax"
		| "ReadPermission"
		| "SwcInitializationFailed"
	readonly file: string
	readonly line?: number
	readonly column?: number
}

//++ Function extraction error from extractFunctions operation
//++ Occurs when AST node cannot be properly interpreted as a function
export type FunctionExtractionError = ArchitectError<"extractFunctions"> & {
	readonly kind:
		| "UnknownNodeType"
		| "MissingIdentifier"
		| "InvalidParameterStructure"
	readonly nodeType?: string
	readonly span?: Span
}

//++ Comment extraction error from extractComments operation
//++ Occurs when comment nodes have invalid structure or position
export type CommentExtractionError = ArchitectError<"extractComments"> & {
	readonly kind: "MalformedComment" | "InvalidPosition"
	readonly span?: Span
}

//++ Import extraction error from extractImports operation
//++ Occurs when import statement structure is invalid
export type ImportExtractionError = ArchitectError<"extractImports"> & {
	readonly kind: "InvalidSpecifier" | "UnknownImportKind"
	readonly specifier?: string
	readonly span?: Span
}

//++ Export extraction error from extractExports operation
//++ Occurs when export statement structure is invalid
export type ExportExtractionError = ArchitectError<"extractExports"> & {
	readonly kind: "InvalidExportName" | "UnknownExportKind"
	readonly exportName?: string
	readonly span?: Span
}

//++ Type extraction error from extractTypes operation
//++ Occurs when type alias or interface has invalid structure
export type TypeExtractionError = ArchitectError<"extractTypes"> & {
	readonly kind: "UnknownTypeKind" | "MissingTypeName"
	readonly span?: Span
}

//++ Constant extraction error from extractConstants operation
//++ Occurs when const declaration is invalid or missing value
export type ConstantExtractionError = ArchitectError<"extractConstants"> & {
	readonly kind: "NotConstant" | "MissingValue"
	readonly span?: Span
}

//++ Violation detection error from detectViolations operation
//++ Occurs when AST traversal fails during violation analysis
export type ViolationDetectionError = ArchitectError<"detectViolations"> & {
	readonly kind: "TraversalFailed"
	readonly nodeType?: string
}

//++ Class extraction error from extractClasses operation
//++ Occurs when class declaration structure is invalid
export type ClassExtractionError = ArchitectError<"extractClasses"> & {
	readonly kind:
		| "UnknownNodeType"
		| "MissingClassName"
		| "InvalidMemberStructure"
	nodeType?: string
	span?: Span
}

//++ Union of all extraction errors for buildParsedFile
//++ Enables error accumulation across all extraction operations
export type ExtractionError =
	| FunctionExtractionError
	| CommentExtractionError
	| ImportExtractionError
	| ExportExtractionError
	| TypeExtractionError
	| ConstantExtractionError
	| ClassExtractionError
	| ViolationDetectionError
