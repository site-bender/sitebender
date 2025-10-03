import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Generator, ParseError } from "../../../../types/index.ts"

export default function _tryParsers<T>(
	generators: ReadonlyArray<Generator<T>>,
): (input: unknown) => Result<ParseError, T> {
	return function withInput(input: unknown) {
		function tryNext(
			index: number,
			lastError: ParseError,
		): Result<ParseError, T> {
			if (index >= generators.length) {
				return err(lastError)
			}

			const gen = generators[index]

			if (!gen.parse) {
				return tryNext(
					index + 1,
					lastError,
				)
			}

			const result = gen.parse(input)

			if (result._tag === "Ok") {
				return result
			}

			return tryNext(
				index + 1,
				result.error,
			)
		}

		const defaultError: ParseError = {
			type: "TypeMismatch",
			expected: "any of the configured types",
			received: String(input),
		}

		return tryNext(0, defaultError)
	}
}
