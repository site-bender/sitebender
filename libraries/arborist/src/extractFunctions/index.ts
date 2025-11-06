// @sitebender/arborist/src/extractFunctions
// Extracts all functions from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ParsedAst, ParsedFunction } from "../types/index.ts"
import type { FunctionExtractionError } from "../types/errors/index.ts"

import _isFunctionOrExportedFunction from "./_isFunctionOrExportedFunction/index.ts"
import _extractDetails from "./_extractDetails/index.ts"

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
	const functionNodes = filter(_isFunctionOrExportedFunction)(moduleBody as ReadonlyArray<Serializable>)

	const functionNodesArray = getOrElse([] as ReadonlyArray<unknown>)(
		functionNodes,
	)

	// Extract details from each function node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractFunctionDetails never fails (returns ParsedFunction directly)
	// Future: wrap extractFunctionDetails to return Validation and use validateAll
	const functions = map(_extractDetails)(functionNodesArray as ReadonlyArray<Serializable>) as ReadonlyArray<ParsedFunction>

	// Return success with extracted functions
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid functions
	return success(functions)
}
