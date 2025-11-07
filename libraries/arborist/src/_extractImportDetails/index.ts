import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ParsedImport } from "../types/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

import _extractSpan from "../_extractSpan/index.ts"
import _extractPosition from "../_extractPosition/index.ts"
import extractKindAndBindings from "../_extractKindAndBindings/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract details from a single import declaration node with validation
//++ Returns Result with ParsedImport or error if extraction fails
//++ Composes Results from _extractSpan, _extractPosition, and extractKindAndBindings
//++
//++ @param node - Import declaration AST node
//++ @returns Result<ImportExtractionError, ParsedImport>
//++
//++ Error kinds:
//++ - InvalidSpecifier: missing or malformed module specifier
//++ - Plus errors from _extractSpan, _extractPosition, extractKindAndBindings
export default function extractImportDetails(
	node: unknown,
): Result<ImportExtractionError, ParsedImport> {
	const importNode = node as Record<string, unknown>

	// Extract specifier (the module path being imported from)
	const specifierNode = importNode.source as Record<string, unknown> | undefined

	if (specifierNode === undefined) {
		const baseError = createError("_extractImportDetails")([])(
			"Import declaration has no 'source' property",
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidSpecifier",
		} as ImportExtractionError)
	}

	const specifier = specifierNode.value as string | undefined

	if (specifier === undefined || typeof specifier !== "string") {
		const baseError = createError("_extractImportDetails")([])(
			"Import source has no valid 'value' property",
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidSpecifier",
			specifier: String(specifierNode.value),
		} as ImportExtractionError)
	}

	// Extract span information (returns Result now)
	const spanResult = _extractSpan(importNode)

	if (spanResult._tag === "error") {
		// Wrap SpanExtractionError as ImportExtractionError
		const baseError = createError("_extractImportDetails")([])(
			`Failed to extract span: ${spanResult.error.message}`,
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidSpecifier",
			specifier,
		} as ImportExtractionError)
	}

	const span = spanResult.value

	// Extract position from span (returns Result now)
	const positionResult = _extractPosition(span)

	if (positionResult._tag === "error") {
		// Wrap PositionExtractionError as ImportExtractionError
		const baseError = createError("_extractImportDetails")([])(
			`Failed to extract position: ${positionResult.error.message}`,
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidSpecifier",
			specifier,
		} as ImportExtractionError)
	}

	const position = positionResult.value

	// Extract import kind and bindings
	const specifiers = or(importNode.specifiers as ReadonlyArray<unknown>)(
		[],
	) as ReadonlyArray<
		unknown
	>
	const isTypeOnly = or(importNode.typeOnly as boolean)(false) as boolean

	const kindAndBindingsResult = extractKindAndBindings(specifiers)(isTypeOnly)

	if (kindAndBindingsResult._tag === "error") {
		return kindAndBindingsResult
	}

	// Ensure we have a valid ok result with value
	if (kindAndBindingsResult.value === undefined) {
		const baseError = createError("_extractImportDetails")([])(
			"extractKindAndBindings returned ok but value is undefined",
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidSpecifier",
			specifier,
		} as ImportExtractionError)
	}

	const { kind, imports } = kindAndBindingsResult.value

	// Return success with all extracted data
	return ok({
		specifier,
		position,
		span,
		kind,
		imports,
	})
}
