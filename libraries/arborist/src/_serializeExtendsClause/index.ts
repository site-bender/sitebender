import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeExtend from "./_serializeExtend/index.ts"

//++ Serialize extends clause for interfaces
//++ Handles array of extends clauses with type arguments
//++ Returns Result with serialized extends clause or empty string if no extends
//++
//++ @param extendsClause - Extends clause array or undefined
//++ @returns Result<TypeExtractionError, string>
export default function serializeExtendsClause(
	extendsClause: unknown,
): Result<TypeExtractionError, string> {
	if (!extendsClause) {
		return ok("")
	}

	const extendsArray = extendsClause as ReadonlyArray<Record<string, unknown>>
	if (isEqual(getOrElse(0)(length(extendsArray)))(0)) {
		return ok("")
	}

	// Reducer function for serializing extends clauses
	function reduceExtends(
		accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
		ext: Record<string, unknown>,
	): Result<TypeExtractionError, ReadonlyArray<string>> {
		if (accResult._tag === "Error") {
			return accResult
		}

		const extResult = _serializeExtend(ext)

		if (extResult._tag === "Error") {
			return extResult
		}

		return ok([...accResult.value, extResult.value])
	}

	const serializedResult = reduce(reduceExtends)(ok([]))(extendsArray)

	if (serializedResult._tag === "Error") {
		return serializedResult
	}

	const serialized = serializedResult.value.join(", ")

	return ok(` extends ${serialized}`)
}
