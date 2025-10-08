// @sitebender/arborist/src/extractFunctions
// Extracts all functions from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"

import type { ParsedAst, ParsedFunction } from "../types/index.ts"
import type { FunctionExtractionError } from "../types/errors/index.ts"

import extractFunctionDetails from "../extractFunctionDetails/index.ts"

//++ Extracts all functions from a ParsedAst
//++ Returns Validation to accumulate extraction errors per function
//++ Continues extraction on individual failures to gather all valid functions
//++ This is the primary function extractor for the Arborist library
export default function extractFunctions(
	ast: ParsedAst,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as ReadonlyArray<unknown>

	// Filter for function declarations and export declarations that wrap functions
	const functionNodes = filter(
		function isFunctionOrExportedFunction(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string

			// Direct function declarations
			if (nodeType === "FunctionDeclaration") {
				return true
			}

			// Export declarations that might wrap functions
			if (nodeType === "ExportDeclaration") {
				const decl = nodeObj.declaration as Record<string, unknown> | undefined
				return decl?.type === "FunctionDeclaration"
			}

			// Default export declarations that might wrap functions
			// Note: SWC uses FunctionExpression for "export default function name()"
			if (nodeType === "ExportDefaultDeclaration") {
				const decl = nodeObj.decl as Record<string, unknown> | undefined
				return decl?.type === "FunctionDeclaration" ||
					decl?.type === "FunctionExpression"
			}

			return false
		},
	)(moduleBody as unknown[])

	// Extract details from each function node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractFunctionDetails never fails (returns ParsedFunction directly)
	// Future: wrap extractFunctionDetails to return Validation and use validateAll
	const functions = map(
		function extractDetails(node: unknown): ParsedFunction {
			return extractFunctionDetails(node)
		},
	)(functionNodes)

	// Return success with extracted functions
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid functions
	return success(functions)
}
