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
	FunctionSignature,
	Parameter,
	TypeInfo,
	TypeKind,
	Generic,
	Member,
	BranchInfo,
	BranchType,
	BranchPath,
	Result,
	ParseError,
	AstNode,
	Position,
	RawComment,
} from "./src/types/index.ts"

// ParsedModule types from parseFileWithCompiler
export type {
	ParsedModule,
	ParsedFunction,
	ParsedType,
	ParsedConstant,
	ParsedExport,
	TraversalMetadata,
} from "./src/parseFileWithCompiler/index.ts"

// Re-export TypeScript for envoy to use (ONLY through Parser!)
export { ts } from "./src/parseFileWithCompiler/index.ts"