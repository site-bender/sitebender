import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ConstantExtractionError } from "../../types/errors/index.ts"

import _serializeExpression from "../index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Reduce template literal parts into a single string with expressions
//++ Processes quasis (template strings) and interpolated expressions
//++ Returns Result with assembled template string or error from expression serialization
//++
//++ @param expressions - Array of expression nodes to serialize
//++ @returns Function that takes quasis array and returns Result<ConstantExtractionError, string>
export default function _reduceTemplatePart(
	expressions: ReadonlyArray<unknown>,
) {
	return function reduceWithExpressions(
		quasis: ReadonlyArray<Record<string, unknown>>,
	): Result<ConstantExtractionError, string> {
		// Helper to accumulate template parts with error propagation
		function accumulateTemplateParts(
			accResult: Result<ConstantExtractionError, string>,
			quasi: Record<string, unknown>,
			index: number,
		): Result<ConstantExtractionError, string> {
			if (accResult._tag === "Error") {
				return accResult
			}

			const cooked = (quasi.cooked as string) ?? ""
			const newAcc = accResult.value + cooked

			const expressionCount = getOrElse(0)(length(expressions))

			if (index < expressionCount) {
				const exprResult = _serializeExpression(expressions[index])

				if (exprResult._tag === "Error") {
					return exprResult
				}

				return ok(newAcc + "${" + exprResult.value + "}")
			}

			return ok(newAcc)
		}

		return reduce(accumulateTemplateParts)(ok(""))(quasis)
	}
}
