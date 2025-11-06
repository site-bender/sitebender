// @sitebender/arborist/src/extractClasses
// Extracts all classes from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"

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
	const classValidations = map(_extractClassDetails(ast))(classNodesArray) as ReadonlyArray<Validation<ClassExtractionError, ParsedClass>>

	// Filter successful class extractions
	const successfulValidationsResult = filter(isSuccess)(classValidations as ReadonlyArray<Serializable>)
	const successfulValidations = getOrElse([] as ReadonlyArray<Validation<ClassExtractionError, ParsedClass>>)(
		successfulValidationsResult
	) as ReadonlyArray<Validation<ClassExtractionError, ParsedClass>>

	// Extract values from successful validations
	const classes = map(function extractValue(v: Serializable): ParsedClass {
		return (v as Validation<ClassExtractionError, ParsedClass>).value
	})(successfulValidations as ReadonlyArray<Serializable>) as ReadonlyArray<ParsedClass>

	// Return success with extracted classes
	return success(classes)
}
