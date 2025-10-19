import type { SwcFnParam } from "../../../types/index.ts"
import _serializeTypeAnnotation from "../../../_serializeTypeAnnotation/index.ts"

export default function _serializeParameter(param: SwcFnParam): string {
	const parameterName = param.pat.value
	const typeAnnotation = param.typeAnnotation

	if (typeAnnotation) {
		const type = _serializeTypeAnnotation(typeAnnotation.typeAnnotation)
		return `${parameterName}: ${type}`
	}

	return parameterName
}
