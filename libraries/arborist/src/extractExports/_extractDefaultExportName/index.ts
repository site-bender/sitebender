import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ExportExtractionError } from "../../types/errors/index.ts"

import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract name from default export declaration with validation
//++ Returns Result with error if declaration structure is invalid
//++ For function/class declarations, extracts the identifier name
//++ For other exports, returns "default"
//++
//++ @param decl - Export declaration object (may be undefined)
//++ @returns Result<ExportExtractionError, string>
//++
//++ Error kinds:
//++ - InvalidExportName: declaration exists but has invalid structure
export default function _extractDefaultExportName(
	decl: Record<string, unknown> | undefined,
): Result<ExportExtractionError, string> {
	// No declaration means anonymous default export
	if (decl === undefined) {
		return ok("default")
	}

	const declType = decl.type as string | undefined

	if (declType === undefined) {
		const baseError = createError("_extractDefaultExportName")([])(
			"Export declaration has no 'type' property",
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidExportName",
			exportName: "default",
		} as ExportExtractionError)
	}

	// Check if it's a function declaration or expression
	const isFunctionType = or(
		isEqual(declType)("FunctionDeclaration"),
	)(isEqual(declType)("FunctionExpression"))

	// Not a function, return "default"
	if (isFunctionType === false) {
		return ok("default")
	}

	// Extract identifier from function declaration
	const ident = decl.identifier as Record<string, unknown> | undefined

	if (ident === undefined) {
		// Anonymous function, return "default"
		return ok("default")
	}

	const identValue = ident.value as string | undefined

	if (identValue === undefined || typeof identValue !== "string") {
		const baseError = createError("_extractDefaultExportName")([])(
			"Function identifier has no valid 'value' property",
		)("INVALID_ARGUMENT")

		return error({
			...baseError,
			kind: "InvalidExportName",
			exportName: "default",
		} as ExportExtractionError)
	}

	return ok(identValue)
}
