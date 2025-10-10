// @sitebender/arborist/src/extractImports
// Extracts all import statements from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

import type {
	ParsedAst,
	ParsedImport,
} from "../types/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

import extractImportDetails from "../_extractImportDetails/index.ts"

//++ Extracts all import statements from a ParsedAst
//++ Returns Validation to accumulate extraction errors per import
//++ Continues extraction on individual failures to gather all valid imports
//++ Handles default, named, namespace, and type-only imports
export default function extractImports(
	ast: ParsedAst,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for import declarations
	const importNodes = filter(
		function isImportDeclaration(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string
			return isEqual(nodeType)("ImportDeclaration")
		},
	)(moduleBody)

	const importNodesArray = getOrElse([] as ReadonlyArray<unknown>)(importNodes)

	// Extract details from each import node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractImportDetails never fails (returns ParsedImport directly)
	// Future: wrap extractImportDetails to return Validation and use validateAll
	const importsResult = map(
		function extractDetails(node: unknown): ParsedImport {
			return extractImportDetails(node)
		},
	)(importNodesArray)

	const imports = getOrElse([] as ReadonlyArray<ParsedImport>)(importsResult)

	// Return success with extracted imports
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid imports
	return success(imports)
}
