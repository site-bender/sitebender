import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../types/errors/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"

//++ Serialize a single extends clause
//++ Handles type reference with optional type arguments
//++ Returns Result with serialized extends clause or error for missing name
//++
//++ @param ext - Extends clause node
//++ @returns Result<TypeExtractionError, string>
export default function _serializeExtend(
	ext: unknown,
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

	const extObj = ext as Record<string, unknown>
	const expr = extObj.expression as Record<string, unknown> | undefined

	if (!expr) {
		return makeTypeError(
			"InvalidExtendsClause",
			"Extends clause has no expression",
		)
	}

	const name = expr.value as string | undefined

	if (!name) {
		return makeTypeError(
			"InvalidExtendsClause",
			"Extends clause expression has no name",
		)
	}

	const typeArgs = extObj.typeArguments as Record<string, unknown> | undefined

	if (typeArgs) {
		const params = typeArgs.params as ReadonlyArray<unknown>

		// Reducer function for serializing type parameters
		function reduceTypeParams(
			accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
			param: unknown,
		): Result<TypeExtractionError, ReadonlyArray<string>> {
			if (accResult._tag === "Error") {
				return accResult
			}

			const paramResult = _serializeTypeAnnotation(param)

			if (paramResult._tag === "Error") {
				return paramResult
			}

			return ok([...accResult.value, paramResult.value])
		}

		const serializedParamsResult = reduce(reduceTypeParams)(ok([]))(params)

		if (serializedParamsResult._tag === "Error") {
			return serializedParamsResult
		}

		const serializedParams = serializedParamsResult.value.join(", ")

		return ok(`${name}<${serializedParams}>`)
	}

	return ok(name)
}
