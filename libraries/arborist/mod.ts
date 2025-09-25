/**
 * @module @sitebender/arborist
 *
 * Shared TypeScript AST parsing and code analysis for the @sitebender ecosystem.
 * This is THE ONLY library that should import TypeScript directly.
 * All other libraries consume Arborist's output.
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
	ArboristContractOutput,
	Comment,
	ParsedComponent,
	ParsedConstant,
	ParsedFile,
	ParsedFunction,
	ParsedParameter,
	ParsedProject,
	ParsedType,
} from "./exports/types/index.ts"
