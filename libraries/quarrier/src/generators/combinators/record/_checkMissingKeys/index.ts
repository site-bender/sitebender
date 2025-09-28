import type { ParseError } from "../../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Check for missing keys in input object
export default function _checkMissingKeys<T extends Record<string, unknown>>(
	expectedKeys: ReadonlyArray<keyof T>,
): (inputObj: Record<string, unknown>) => Result<ParseError, void> {
	return function checkWithInput(
		inputObj: Record<string, unknown>,
	): Result<ParseError, void> {
		return checkRecursive(0)

		function checkRecursive(index: number): Result<ParseError, void> {
			if (index >= expectedKeys.length) {
				return ok(undefined)
			}

			const key = expectedKeys[index]
			if (!(key in inputObj)) {
				return err({
					type: "ValidationFailed",
					value: inputObj,
					reason: `Missing required property: ${String(key)}`,
				})
			}

			return checkRecursive(index + 1)
		}
	}
}
