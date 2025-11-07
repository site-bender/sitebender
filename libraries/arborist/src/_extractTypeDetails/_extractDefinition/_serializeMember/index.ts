import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../../types/errors/index.ts"
import type {
	SwcFnParam,
	TsMethodSignature,
	TsPropertySignature,
	TsTypeElement,
} from "../../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeTypeAnnotation from "../../../_serializeTypeAnnotation/index.ts"
import _serializeParameters from "./_serializeParameters/index.ts"

//++ Serialize a TypeScript interface member to string
//++ Handles property signatures and method signatures
//++ Returns Result with serialized member or error for invalid member structure
//++
//++ @param member - Type element node
//++ @returns Result<TypeExtractionError, string>
export default function _serializeMember(
	member: TsTypeElement,
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

	const memberType = member.type

	if (isEqual(memberType)("TsPropertySignature")) {
		const propertyMember = member as TsPropertySignature
		const keyName = propertyMember.key.value as string | undefined

		if (!keyName) {
			return makeTypeError(
				"MalformedTypeMember",
				"Property signature has no key name",
			)
		}

		const typeAnnotation = propertyMember.typeAnnotation

		if (typeAnnotation) {
			const typeResult = _serializeTypeAnnotation(typeAnnotation.typeAnnotation)

			if (typeResult._tag === "Error") {
				return typeResult
			}

			const optional = propertyMember.optional
			const readonly = propertyMember.readonly
			const readonlyPrefix = readonly ? "readonly " : ""

			return ok(
				`${readonlyPrefix}${keyName}${
					optional ? "?" : ""
				}: ${typeResult.value}`,
			)
		}

		return ok(keyName)
	}

	if (isEqual(memberType)("TsMethodSignature")) {
		const methodMember = member as TsMethodSignature
		const keyName = methodMember.key.value as string | undefined

		if (!keyName) {
			return makeTypeError(
				"MalformedTypeMember",
				"Method signature has no key name",
			)
		}

		const params = methodMember.params

		const serializedParamsResult = reduce(_serializeParameters)(
			ok([] as ReadonlyArray<string>),
		)(params as ReadonlyArray<SwcFnParam>)

		if (serializedParamsResult._tag === "Error") {
			return serializedParamsResult
		}

		const serializedParams = serializedParamsResult.value.join(", ")

		const returnTypeAnnotation = methodMember.typeAnnotation

		if (returnTypeAnnotation) {
			const returnTypeResult = _serializeTypeAnnotation(
				returnTypeAnnotation.typeAnnotation,
			)

			if (returnTypeResult._tag === "Error") {
				return returnTypeResult
			}

			return ok(`${keyName}(${serializedParams}): ${returnTypeResult.value}`)
		}

		return ok(`${keyName}(${serializedParams}): void`)
	}

	return ok("")
}
