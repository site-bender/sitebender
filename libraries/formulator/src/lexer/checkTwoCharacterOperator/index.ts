import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/string/length/index.ts"
import lt from "@sitebender/toolsmith/validation/lt/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import { TWO_CHARACTER_OPERATOR_MAP } from "../constants/index.ts"

import makeCompositeKey from "./_makeCompositeKey/index.ts"

//++ Checks if current position starts a two-character operator (curried)
export default function checkTwoCharacterOperator(input: string) {
	return function checkTwoCharacterOperatorWithPosition(
		position: number,
	): Result<string, string> {
		if (lt(length(input))(increment(position))) {
			const code1 = input.charCodeAt(position)
			const code2 = input.charCodeAt(increment(position))
			const key = makeCompositeKey(code1)(code2)
			const operator = TWO_CHARACTER_OPERATOR_MAP[key]

			if (operator) {
				return ok(operator)
			}
		}

		return error(`No two-character operator found at position ${position}`)
	}
}
