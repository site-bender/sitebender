import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"

import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Serialize type parameters (generics) if present
//++ Returns Result with serialized type parameters or error for malformed structure
//++
//++ @param typeParams - Type parameters node
//++ @returns Result<TypeExtractionError, string>
//++
//++ Error kinds:
//++ - InvalidTypeParameter: missing parameter name or malformed structure
export default function serializeTypeParameters(
	typeParams: unknown,
): Result<TypeExtractionError, string> {
	if (!typeParams) {
		return ok("")
	}

	const typeParamsObj = typeParams as Record<string, unknown>
	const params = typeParamsObj.params as
		| ReadonlyArray<Record<string, unknown>>
		| undefined

	if (!params) {
		return ok("")
	}

	// Get array length (length returns a Result)
	const lengthResult = length(params)

	if (lengthResult._tag === "Error") {
		return error({
			operation: "extractTypes",
			kind: "InvalidTypeParameter",
			message: "Failed to get params length",
			code: "INVALID_ARGUMENT",
			args: [],
			timestamp: Date.now(),
		} as TypeExtractionError)
	}

	if (isEqual(lengthResult.value)(0)) {
		return ok("")
	}

	// Helper to serialize a single type parameter
	function serializeTypeParameter(
		param: Record<string, unknown>,
	): Result<TypeExtractionError, string> {
		const nameObj = param.name as Record<string, unknown> | undefined

		if (!nameObj) {
			return error({
				operation: "extractTypes",
				kind: "InvalidTypeParameter",
				message: "Type parameter has no name",
				code: "INVALID_ARGUMENT",
				args: [],
				timestamp: Date.now(),
			} as TypeExtractionError)
		}

		const name = nameObj.value as string | undefined

		if (!name) {
			return error({
				operation: "extractTypes",
				kind: "InvalidTypeParameter",
				message: "Type parameter name has no value",
				code: "INVALID_ARGUMENT",
				args: [],
				timestamp: Date.now(),
			} as TypeExtractionError)
		}

		const constraint = param.constraint
			? ` extends ${_serializeTypeAnnotation(param.constraint)}`
			: ""
		const defaultType = param.default
			? ` = ${_serializeTypeAnnotation(param.default)}`
			: ""

		return ok(`${name}${constraint}${defaultType}`)
	}

	// Use reduce to accumulate serialized type parameters
	const serializedResult = reduce<
		Record<string, unknown>,
		Result<TypeExtractionError, ReadonlyArray<string>>
	>(
		function accumulateTypeParams(
			accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
			param: Record<string, unknown>,
		): Result<TypeExtractionError, ReadonlyArray<string>> {
			if (accResult._tag === "Error") {
				return accResult
			}

			const paramResult = serializeTypeParameter(param)

			if (paramResult._tag === "Error") {
				return paramResult
			}

			return ok([...accResult.value, paramResult.value])
		},
	)(ok([] as ReadonlyArray<string>))(params)

	if (serializedResult._tag === "Error") {
		return serializedResult
	}

	const serialized = serializedResult.value.join(", ")

	return ok(`<${serialized}>`)
}
