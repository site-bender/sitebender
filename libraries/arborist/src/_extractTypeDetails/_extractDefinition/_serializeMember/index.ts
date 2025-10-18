import type { TsTypeElement, TsPropertySignature, TsMethodSignature, SwcFnParam } from "../../../types/index.ts"
import _serializeTypeAnnotation from "../../../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _serializeParameters from "./_serializeParameters/index.ts"

//++ Serialize a TypeScript interface member to string
//++ Handles property signatures and method signatures
export default function _serializeMember(member: TsTypeElement): string {
	const memberType = member.type

	if (isEqual(memberType)("TsPropertySignature")) {
		// Type narrowing: now TypeScript knows member is TsPropertySignature
		const propertyMember = member as TsPropertySignature
		const keyName = propertyMember.key.value
		const typeAnnotation = propertyMember.typeAnnotation

		if (typeAnnotation) {
			const type = _serializeTypeAnnotation(typeAnnotation.typeAnnotation)
			const optional = propertyMember.optional
			const readonly = propertyMember.readonly
			const readonlyPrefix = readonly ? "readonly " : ""

			return `${readonlyPrefix}${keyName}${optional ? "?" : ""}: ${type}`
		}

		return keyName
	}

	if (isEqual(memberType)("TsMethodSignature")) {
		// Type narrowing: now TypeScript knows member is TsMethodSignature
		const methodMember = member as TsMethodSignature
		const keyName = methodMember.key.value
		const params = methodMember.params

		const serializedParamsResult = reduce(_serializeParameters)([] as ReadonlyArray<string>)(params as ReadonlyArray<SwcFnParam>)
		const serializedParamsList = getOrElse([] as ReadonlyArray<string>)(serializedParamsResult)
		const serializedParams = serializedParamsList.join(", ")

		const returnType = methodMember.typeAnnotation
			? _serializeTypeAnnotation(methodMember.typeAnnotation.typeAnnotation)
			: "void"

		return `${keyName}(${serializedParams}): ${returnType}`
	}

	return ""
}
