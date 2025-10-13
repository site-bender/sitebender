import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"

export default function _serializeParameter(param: unknown): string {
	const paramObj = param as Record<string, unknown>
	const pat = paramObj.pat as Record<string, unknown>
	const paramName = pat.value as string
	const typeAnn = paramObj.typeAnnotation as
		| Record<string, unknown>
		| undefined
	if (typeAnn) {
		const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
		return `${paramName}: ${type}`
	}
	return paramName
}
