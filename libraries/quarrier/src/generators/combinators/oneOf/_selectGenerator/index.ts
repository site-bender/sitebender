import type { Generator, Seed } from "../../../../types/index.ts"
import splitSeed from "../../../../random/splitSeed/index.ts"
import _boundedInt from "../../../../random/_boundedInt/index.ts"

export default function _selectGenerator<T>(
	generators: ReadonlyArray<Generator<T>>,
): (
	seed: Seed,
) => { readonly generator: Generator<T> | undefined; readonly nextSeed: Seed } {
	return function withSeed(seed: Seed) {
		if (generators.length === 0) {
			const { right: nextSeed } = splitSeed(seed)
			return {
				generator: undefined,
				nextSeed,
			}
		}

		const { left: selectionSeed, right: nextSeed } = splitSeed(seed)
		const indexResult = _boundedInt(selectionSeed, 0, generators.length - 1)

		if (indexResult._tag === "Error") {
			// Should never happen with valid bounds, but handle gracefully
			return {
				generator: generators[0],
				nextSeed,
			}
		}

		const index = indexResult.value.value

		return {
			generator: generators[index],
			nextSeed,
		}
	}
}
