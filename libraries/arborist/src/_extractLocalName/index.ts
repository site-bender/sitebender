import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { LocalNameExtractionError } from "../types/errors/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract the local name from an import/export specifier with validation
//++ Returns Result with error if specifier structure is invalid
//++ Validates: local property exists, local.type is "Identifier", local.value exists
//++
//++ @param spec - Import or export specifier object
//++ @returns Result<LocalNameExtractionError, string>
//++
//++ Error kinds:
//++ - MissingLocal: spec.local is undefined
//++ - NotIdentifier: spec.local.type is not "Identifier"
//++ - InvalidSpecifier: spec.local.value is missing or not a string
export default function extractLocalName(
	spec: Record<string, unknown>,
): Result<LocalNameExtractionError, string> {
	// Check if local property exists
	const local = spec.local as Record<string, unknown> | undefined

	if (local === undefined) {
		const baseError = createError("_extractLocalName")([])(
			"Import/export specifier has no 'local' property",
		)("INVALID_ARGUMENT")

		const localNameError: LocalNameExtractionError = {
			...baseError,
			kind: "MissingLocal",
		}

		return error(localNameError)
	}

	// Check if local.type is "Identifier"
	const localType = local.type as string | undefined
	const isIdentifier = localType !== undefined &&
		isEqual(localType)("Identifier")

	if (isIdentifier === false) {
		const baseError = createError("_extractLocalName")([])(
			`Expected local.type to be "Identifier" but got "${
				localType ?? "undefined"
			}"`,
		)("INVALID_ARGUMENT")

		const localNameError: LocalNameExtractionError = {
			...baseError,
			kind: "NotIdentifier",
			specifierType: localType,
		}

		return error(localNameError)
	}

	// Extract the value (name)
	const localValue = local.value as string | undefined

	if (localValue === undefined || typeof localValue !== "string") {
		const baseError = createError("_extractLocalName")([])(
			"Identifier has no 'value' property or value is not a string",
		)("INVALID_ARGUMENT")

		const localNameError: LocalNameExtractionError = {
			...baseError,
			kind: "InvalidSpecifier",
			specifierType: localType,
		}

		return error(localNameError)
	}

	// Return the extracted name
	return ok(localValue)
}
