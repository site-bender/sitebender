import _serializeTypeAnnotation from "../index.ts"

export default function _serializeExtend(ext: unknown): string {
	const extObj = ext as Record<string, unknown>
	const expr = extObj.expression as Record<string, unknown>
	const name = expr.value as string
	const typeArgs = extObj.typeArguments as Record<string, unknown> | undefined
	if (typeArgs) {
		const params = typeArgs.params as Array<unknown>
		const serializedParams = params.map(_serializeTypeAnnotation).join(", ")
		return `${name}<${serializedParams}>`
	}
	return name
}
