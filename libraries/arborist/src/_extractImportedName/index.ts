import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

import extractLocalName from "../_extractLocalName/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract the imported name from an import specifier with validation
//++ Returns Result with error if specifier structure is invalid
//++ For named imports: import { foo } or import { foo as bar }
//++ The "imported" field contains the original name from the module
//++
//++ @param spec - Import specifier object
//++ @returns Result<ImportExtractionError, string>
//++
//++ Error kinds:
//++ - InvalidSpecifier: imported field is missing or has invalid structure
export default function extractImportedName(
	spec: Record<string, unknown>,
): Result<ImportExtractionError, string> {
	// For named imports: import { foo } or import { foo as bar }
	// The "imported" field contains the original name from the module
	const imported = spec.imported as Record<string, unknown> | undefined

	// Try to extract from imported field first
	if (imported !== undefined && imported.type === "Identifier") {
		const importedValue = imported.value

		if (typeof importedValue === "string" && importedValue.length > 0) {
			return ok(importedValue)
		}
	}

	// Fallback: use local if imported is missing or invalid (for default imports)
	const localNameResult = extractLocalName(spec)

	// If extractLocalName failed, wrap the error as ImportExtractionError
	if (localNameResult._tag === "error") {
		const baseError = createError("_extractImportedName")([])(
			`Failed to extract imported name: ${localNameResult.error.message}`,
		)("INVALID_ARGUMENT")

		const importError: ImportExtractionError = {
			...baseError,
			kind: "InvalidSpecifier",
			specifier: spec.source as string | undefined,
		}

		return error(importError)
	}

	// Return the string value from extractLocalName
	return ok(localNameResult.value)
}
