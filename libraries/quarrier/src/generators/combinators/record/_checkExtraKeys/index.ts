import type { ParseError } from "../../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Check for extra keys in input object
export default function _checkExtraKeys(
	expectedKeys: ReadonlyArray<string>,
): (inputKeys: ReadonlyArray<string>) => Result<ParseError, void> {
	return function checkWithInput(
		inputKeys: ReadonlyArray<string>,
	): Result<ParseError, void> {
		return checkRecursive(0)

		function checkRecursive(index: number): Result<ParseError, void> {
			if (index >= inputKeys.length) {
				return ok(undefined)
			}

			const key = inputKeys[index]
			if (!expectedKeys.includes(key)) {
				return err({
					type: "ValidationFailed",
					value: inputKeys,
					reason: `Unexpected property: ${key}`,
				})
			}

			return checkRecursive(index + 1)
		}
	}
}
