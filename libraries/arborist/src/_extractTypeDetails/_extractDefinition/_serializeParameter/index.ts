import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../../types/errors/index.ts"
import type { SwcFnParam } from "../../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import _serializeTypeAnnotation from "../../../_serializeTypeAnnotation/index.ts"

//++ Serialize a function parameter to string
//++ Handles optional type annotations
//++ Returns Result with serialized parameter or error for invalid structure
//++
//++ @param param - Function parameter node
//++ @returns Result<TypeExtractionError, string>
export default function _serializeParameter(
	param: SwcFnParam,
): Result<TypeExtractionError, string> {
	// Helper to create TypeExtractionError
	function makeTypeError(
		kind: TypeExtractionError["kind"],
		message: string,
	): Result<TypeExtractionError, string> {
		const baseError = createError("extractTypes")([])(message)(
			"INVALID_ARGUMENT",
		)

		const { context: _unused, ...baseErrorFields } = baseError

		const typeError: TypeExtractionError = {
			...baseErrorFields,
			kind,
		}

		return error(typeError)
	}

	const parameterName = param.pat.value as string | undefined

	if (!parameterName) {
		return makeTypeError("InvalidTypeParameter", "Parameter has no name")
	}

	const typeAnnotation = param.typeAnnotation

	if (typeAnnotation) {
		const typeResult = _serializeTypeAnnotation(typeAnnotation.typeAnnotation)

		if (typeResult._tag === "Error") {
			return typeResult
		}

		return ok(`${parameterName}: ${typeResult.value}`)
	}

	return ok(parameterName)
}
