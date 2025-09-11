/**
 * @module @sitebender/parser
 *
 * Shared TypeScript AST parsing and code analysis for the @sitebender ecosystem.
 * This is THE ONLY library that should import TypeScript directly.
 * All other libraries consume Parser's output.
 * 
 * CONTRACT ENFORCED: Only exports from the exports/ directory are public API.
 * Internal implementation details are hidden in internal/ directory.
 */

// Public API - Contract compliant exports only
export { default as parseFile } from "./exports/parseFile/index.ts"
export { default as parseProject } from "./exports/parseProject/index.ts"
export { default as parseString } from "./exports/parseString/index.ts"

// Public types - Contract compliant
export type {
	Comment,
	ParsedComponent,
	ParsedConstant,
	ParsedFile,
	ParsedFunction,
	ParsedParameter,
	ParsedProject,
	ParsedType,
	ParserContractOutput,
} from "./exports/types/index.ts"
