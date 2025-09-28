import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import _generateRecordProperties from "./_generateRecordProperties/index.ts"
import _shrinkRecordProperties from "./_shrinkRecordProperties/index.ts"
import _checkMissingKeys from "./_checkMissingKeys/index.ts"
import _checkExtraKeys from "./_checkExtraKeys/index.ts"
import _parseRecordProperties from "./_parseRecordProperties/index.ts"

type RecordGenerators<T extends Record<string, unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Generator combinator for objects with specific shape
export default function record<T extends Record<string, unknown>>(
	generators: RecordGenerators<T>,
): Generator<T> {
	const keys = Object.keys(generators) as Array<keyof T>

	return {
		next: function generateNext(seed: Seed): GeneratorResult<T> {
			const state = _generateRecordProperties(generators)(keys)({
				seed,
				record: {} as T,
				totalSize: 0,
			})

			return {
				value: state.record,
				nextSeed: state.seed,
				size: state.totalSize,
			}
		},

		shrink: function shrinkRecord(value: T): ShrinkTree<T> {
			if (keys.length === 0) {
				return {
					value,
					children: function getNoChildren() {
						return []
					},
				}
			}

			const shrinks = _shrinkRecordProperties(generators)(value)(keys)

			return {
				value,
				children: function getChildren() {
					return shrinks
				},
			}
		},

		parse: function parseRecord(input: unknown): Result<ParseError, T> {
			if (typeof input !== "object" || input === null || Array.isArray(input)) {
				return err({
					type: "TypeMismatch",
					expected: "object",
					received: input === null
						? "null"
						: Array.isArray(input)
						? "array"
						: typeof input,
				})
			}

			const inputObj = input as Record<string, unknown>
			const inputKeys = Object.keys(inputObj)
			const expectedKeys = keys.map(String)

			// Check for missing keys
			const missingCheck = _checkMissingKeys(keys)(inputObj)
			if (missingCheck._tag === "Error") {
				return missingCheck as Result<ParseError, T>
			}

			// Check for extra keys
			const extraCheck = _checkExtraKeys(expectedKeys)(inputKeys)
			if (extraCheck._tag === "Error") {
				return extraCheck as Result<ParseError, T>
			}

			return _parseRecordProperties(generators)(inputObj)(keys)
		},
	}
}

//?? [EXAMPLE] Creating record generators
//?? const userGen = record({
//??   id: integer(0, 999999),
//??   name: string(),
//??   email: string(),
//??   isAdmin: boolean,
//?? })

//?? [SHRINKING] Each property shrinks independently
//?? [PARSING] Validates exact shape - no missing or extra properties
