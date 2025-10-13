// @sitebender/arborist/src/extractClasses
// Extracts all classes from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ParsedAst, ParsedClass } from "../types/index.ts"
import type { ClassExtractionError } from "../types/errors/index.ts"

import _isClassOrExportedClass from "./_isClassOrExportedClass/index.ts"
import _extractClassDetails from "./_extractClassDetails/index.ts"

//++ Extracts all classes from a ParsedAst
//++ Returns Validation to accumulate extraction errors per class
//++ Continues extraction on individual failures to gather all valid classes
//++ This is the primary class extractor for the Arborist library
export default function extractClasses(
	ast: ParsedAst,
): Validation<ClassExtractionError, ReadonlyArray<ParsedClass>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as ReadonlyArray<unknown>

	// Filter for class declarations and export declarations that wrap classes
	const classNodes = filter(_isClassOrExportedClass)(moduleBody as ReadonlyArray<Serializable>)

	const classNodesArray = getOrElse([] as ReadonlyArray<Serializable>)(
		classNodes,
	)

	// Extract details from each class node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, _extractClassDetails returns Validation, but we need to handle it
	// Future: use validateAll to accumulate errors and successes
	const classValidations = classNodesArray.map(_extractClassDetails(ast))

	// For now, filter out failures and extract successes
	// This is a temporary solution until proper Validation accumulation is implemented
	const classes = classValidations
		.filter((validation: any) => validation._tag === "Success")
		.map((validation: any) => validation.value) as ReadonlyArray<ParsedClass>

	// Debug: log failures
	const failures = classValidations.filter((validation: any) => validation._tag === "Failure")
	if (failures.length > 0) {
		console.log(`Found ${failures.length} class extraction failures:`)
		failures.forEach((failure: any, index: number) => {
			console.log(`Failure ${index}:`, failure.errors)
		})
	}

	// Return success with extracted classes
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid classes
	return success(classes)
}
