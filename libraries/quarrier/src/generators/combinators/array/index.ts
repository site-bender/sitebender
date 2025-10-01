import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import _boundedInt from "../../../random/_boundedInt/index.ts"
import _generateElements from "./_generateElements/index.ts"
import _shrinkElements from "./_shrinkElements/index.ts"
import _parseElements from "./_parseElements/index.ts"
import _sizeShrinks from "./_sizeShrinks/index.ts"

type ArrayOptions = {
	readonly minSize?: number
	readonly maxSize?: number
}

//++ Generator combinator for arrays of elements from another generator
export default function array<T>(
	elementGen: Generator<T>,
	options: ArrayOptions = {},
): Generator<ReadonlyArray<T>> {
	const minSize = options.minSize ?? 0
	const maxSize = options.maxSize ?? 10

	return {
		next: function generateNext(seed: Seed): GeneratorResult<ReadonlyArray<T>> {
			// Generate array size
			const sizeResult = _boundedInt(seed, minSize, maxSize)
			if (sizeResult._tag === "Error") {
				return {
					value: [],
					nextSeed: seed,
					size: 0,
				}
			}

			const arraySize = sizeResult.value.value
			const state = _generateElements(elementGen)(arraySize)({
				seed: sizeResult.value.nextSeed,
				elements: [],
				totalSize: 0,
			})

			return {
				value: state.elements,
				nextSeed: state.seed,
				size: state.elements.length + state.totalSize,
			}
		},

		shrink: function shrinkArray(
			value: ReadonlyArray<T>,
		): ShrinkTree<ReadonlyArray<T>> {
			if (value.length === 0) {
				return {
					value,
					children: function getNoChildren() {
						return []
					},
				}
			}

			const sizeShrinks = _sizeShrinks(elementGen)(options)(value)
			const elementShrinks = _shrinkElements(elementGen)(value)

			return {
				value,
				children: function getChildren() {
					return [...sizeShrinks, ...elementShrinks]
				},
			}
		},

		parse: function parseArray(
			input: unknown,
		): Result<ParseError, ReadonlyArray<T>> {
			if (!Array.isArray(input)) {
				return err({
					type: "TypeMismatch",
					expected: "array",
					received: typeof input,
				})
			}

			return _parseElements(elementGen)(input)
		},
	}
}
