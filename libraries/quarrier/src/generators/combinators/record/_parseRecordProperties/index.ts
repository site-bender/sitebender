import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Generator, ParseError } from "../../../../types/index.ts"

type RecordGenerators<T extends Record<string, unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Parse record properties recursively
export default function _parseRecordProperties<
	T extends Record<string, unknown>,
>(
	generators: RecordGenerators<T>,
): (
	inputObj: Record<string, unknown>,
) => (keys: ReadonlyArray<keyof T>) => Result<ParseError, T> {
	return function parseWithInput(inputObj: Record<string, unknown>) {
		return function parseWithKeys(
			keys: ReadonlyArray<keyof T>,
		): Result<ParseError, T> {
			return parseRecursive(0, {})

			function parseRecursive(
				index: number,
				parsed: Record<string, unknown>,
			): Result<ParseError, T> {
				if (index >= keys.length) {
					return ok(parsed as T)
				}

				const key = keys[index]
				const gen = generators[key]

				if (gen.parse) {
					const result = gen.parse(inputObj[key as string])
					if (result._tag === "Error") {
						return err({
							type: "ValidationFailed",
							value: inputObj,
							reason: `Property '${String(key)}' failed validation`,
						})
					}
					return parseRecursive(index + 1, { ...parsed, [key]: result.value })
				} else {
					return parseRecursive(index + 1, {
						...parsed,
						[key]: inputObj[key as string],
					})
				}
			}
		}
	}
}
