/**
 * @module @sitebender/parser
 *
 * Shared TypeScript AST parsing and code analysis for the @sitebender ecosystem.
 * This is THE ONLY library that should import TypeScript directly.
 * All other libraries consume Parser's output.
 */

// Main parsing functions
export { default as parseSourceFile } from "./src/parseSourceFile/index.ts"
export { default as extractFunctions } from "./src/extractFunctions/index.ts"
export { default as extractSignature } from "./src/extractSignature/index.ts"
export { default as parseFileWithCompiler } from "./src/parseFileWithCompiler/index.ts"

// Either monad exports
export { Left, Right } from "./src/either/index.ts"
export type { Either } from "./src/either/index.ts"

// Type exports
export type {
	AstNode,
	BranchInfo,
	BranchPath,
	BranchType,
	FunctionSignature,
	Generic,
	Member,
	Parameter,
	ParseError,
	Position,
	RawComment,
	Result,
	TypeInfo,
	TypeKind,
} from "./src/types/index.ts"

// ParsedModule types from parseFileWithCompiler
export type {
	ParsedConstant,
	ParsedExport,
	ParsedFunction,
	ParsedModule,
	ParsedType,
	TraversalMetadata,
} from "./src/parseFileWithCompiler/index.ts"
