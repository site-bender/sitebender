import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Generator, ParseError } from "../../../../types/index.ts"

//++ Parse array elements recursively
export default function _parseElements<T>(
	elementGen: Generator<T>,
): (input: ReadonlyArray<unknown>) => Result<ParseError, ReadonlyArray<T>> {
	return function parseWithInput(
		input: ReadonlyArray<unknown>,
	): Result<ParseError, ReadonlyArray<T>> {
		return parseRecursive(0, [])

		function parseRecursive(
			index: number,
			parsed: ReadonlyArray<T>,
		): Result<ParseError, ReadonlyArray<T>> {
			if (index >= input.length) {
				return ok(parsed)
			}

			if (elementGen.parse) {
				const result = elementGen.parse(input[index])
				if (result._tag === "Error") {
					return err({
						type: "ValidationFailed",
						value: input,
						reason: `Element at index ${index} failed validation`,
					})
				}
				return parseRecursive(index + 1, [...parsed, result.value])
			} else {
				return parseRecursive(index + 1, [...parsed, input[index] as T])
			}
		}
	}
}
