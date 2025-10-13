import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import _serializeExtend from "./_serializeExtend/index.ts"

//++ Serialize extends clause for interfaces
export default function serializeExtendsClause(
	extendsClause: unknown,
): string {
	if (!extendsClause) {
		return ""
	}

	const extendsArray = extendsClause as Array<Record<string, unknown>>
	if (isEqual(getOrElse(0)(length(extendsArray)))(0)) {
		return ""
	}

	const serializedResult = map(_serializeExtend)(extendsArray)
	const serialized = getOrElse([] as ReadonlyArray<string>)(serializedResult).join(", ")

	return ` extends ${serialized}`
}
