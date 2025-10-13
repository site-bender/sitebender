import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Serialize type parameters (generics) if present
export default function serializeTypeParameters(
	typeParams: unknown,
): string {
	if (!typeParams) {
		return ""
	}

	const typeParamsObj = typeParams as Record<string, unknown>
	const params = typeParamsObj.params as Array<Record<string, unknown>>
	if (!params || isEqual(getOrElse(0)(length(params)))(0)) {
		return ""
	}

	function serializeTypeParameter(param: Record<string, unknown>): string {
		const name = (param.name as Record<string, unknown>).value as string
		const constraint = param.constraint
			? ` extends ${_serializeTypeAnnotation(param.constraint)}`
			: ""
		const defaultType = param.default
			? ` = ${_serializeTypeAnnotation(param.default)}`
			: ""
		return `${name}${constraint}${defaultType}`
	}

	const serialized = params.map(serializeTypeParameter).join(", ")

	return `<${serialized}>`
}
