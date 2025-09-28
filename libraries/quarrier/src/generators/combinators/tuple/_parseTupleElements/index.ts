import type { Generator, ParseError } from "../../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"

type TupleGenerators<T extends ReadonlyArray<unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Parse tuple elements recursively
export default function _parseTupleElements<T extends ReadonlyArray<unknown>>(
	generators: TupleGenerators<T>,
): (input: ReadonlyArray<unknown>) => Result<ParseError, T> {
	return function parseWithInput(
		input: ReadonlyArray<unknown>,
	): Result<ParseError, T> {
		return parseRecursive(0, [])

		function parseRecursive(
			index: number,
			parsed: ReadonlyArray<unknown>,
		): Result<ParseError, T> {
			if (index >= generators.length) {
				return ok(parsed as unknown as T)
			}

			const gen = generators[index]
			if (gen.parse) {
				const result = gen.parse(input[index])
				if (result._tag === "Error") {
					return err({
						type: "ValidationFailed",
						value: input,
						reason: `Element at index ${index} failed validation`,
					})
				}
				return parseRecursive(index + 1, [...parsed, result.value])
			} else {
				return parseRecursive(index + 1, [...parsed, input[index]])
			}
		}
	}
}
