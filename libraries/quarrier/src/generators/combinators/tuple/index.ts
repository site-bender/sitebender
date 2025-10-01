import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import _generateTupleElements from "./_generateTupleElements/index.ts"
import _shrinkTupleElements from "./_shrinkTupleElements/index.ts"
import _parseTupleElements from "./_parseTupleElements/index.ts"

type TupleGenerators<T extends ReadonlyArray<unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Generator combinator for fixed-size tuples
export default function tuple<T extends ReadonlyArray<unknown>>(
	generators: TupleGenerators<T>,
): Generator<T> {
	return {
		next: function generateNext(seed: Seed): GeneratorResult<T> {
			const state = _generateTupleElements(generators)({
				seed,
				values: [],
				totalSize: 0,
			})

			return {
				value: state.values as unknown as T,
				nextSeed: state.seed,
				size: state.totalSize,
			}
		},

		shrink: function shrinkTuple(value: T): ShrinkTree<T> {
			if (generators.length === 0) {
				return {
					value,
					children: function getNoChildren() {
						return []
					},
				}
			}

			const shrinks = _shrinkTupleElements(generators)(value)

			return {
				value,
				children: function getChildren() {
					return shrinks
				},
			}
		},

		parse: function parseTuple(input: unknown): Result<ParseError, T> {
			if (!Array.isArray(input)) {
				return err({
					type: "TypeMismatch",
					expected: "array",
					received: typeof input,
				})
			}

			if (input.length !== generators.length) {
				return err({
					type: "ValidationFailed",
					value: input,
					reason:
						`Expected tuple of length ${generators.length}, got ${input.length}`,
				})
			}

			return _parseTupleElements(generators)(input)
		},
	}
}
