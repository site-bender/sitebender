import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _serializeParameter from "../_serializeParameter/index.ts"

export default function _serializeMember(member: Record<string, unknown>): string {
	const memberType = member.type as string
	if (isEqual(memberType)("TsPropertySignature")) {
		const key = member.key as Record<string, unknown>
		const keyName = key.value as string
		const typeAnn = member.typeAnnotation as
			| Record<string, unknown>
			| undefined
		if (typeAnn) {
			const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
			const optional = member.optional as boolean
			const readonly = member.readonly as boolean
			const readonlyPrefix = readonly ? "readonly " : ""
			return `${readonlyPrefix}${keyName}${optional ? "?" : ""}: ${type}`
		}
		return keyName
	}
	if (isEqual(memberType)("TsMethodSignature")) {
		const key = member.key as Record<string, unknown>
		const keyName = key.value as string
		const params = member.params as Array<Record<string, unknown>>
		const serializedParamsResult = map(_serializeParameter)(params)
		const serializedParams = getOrElse([] as ReadonlyArray<string>)(serializedParamsResult).join(", ")
		const returnType = member.typeAnnotation
			? _serializeTypeAnnotation(
				(member.typeAnnotation as Record<string, unknown>)
					.typeAnnotation,
			)
			: "void"
		return `${keyName}(${serializedParams}): ${returnType}`
	}
	return ""
}
