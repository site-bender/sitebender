import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Serialize extends clause for interfaces
export default function serializeExtendsClause(
	extendsClause: unknown,
): string {
	if (!extendsClause) {
		return ""
	}

	const extendsArray = extendsClause as Array<Record<string, unknown>>
	if (isEqual(extendsArray.length)(0)) {
		return ""
	}

	const serialized = extendsArray.map((ext) => {
		const expr = ext.expression as Record<string, unknown>
		const name = expr.value as string
		const typeArgs = ext.typeArguments as Record<string, unknown> | undefined
		if (typeArgs) {
			const params = typeArgs.params as Array<unknown>
			const serializedParams = params.map(_serializeTypeAnnotation).join(", ")
			return `${name}<${serializedParams}>`
		}
		return name
	}).join(", ")

	return ` extends ${serialized}`
}
