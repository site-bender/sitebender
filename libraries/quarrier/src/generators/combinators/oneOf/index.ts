import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import _selectGenerator from "./_selectGenerator/index.ts"
import _shrinkWithAlternatives from "./_shrinkWithAlternatives/index.ts"
import _tryParsers from "./_tryParsers/index.ts"

export default function oneOf<T>(
	generators: ReadonlyArray<Generator<T>>,
): Generator<T> {
	return {
		next: function generateNext(seed: Seed): GeneratorResult<T> {
			if (generators.length === 0) {
				return {
					value: undefined as T,
					nextSeed: seed,
					size: 0,
				}
			}

			const selector = _selectGenerator(generators)
			const selection = selector(seed)

			if (!selection.generator) {
				return {
					value: undefined as T,
					nextSeed: selection.nextSeed,
					size: 0,
				}
			}

			return selection.generator.next(selection.nextSeed)
		},

		shrink: function shrinkValue(value: T): ShrinkTree<T> {
			const shrinker = _shrinkWithAlternatives(generators)
			return shrinker(value)
		},

		parse: function parseValue(input: unknown): Result<ParseError, T> {
			const tryParser = _tryParsers(generators)
			return tryParser(input)
		},
	}
}
