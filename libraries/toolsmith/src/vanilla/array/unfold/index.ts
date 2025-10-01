import isNull from "../../validation/isNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Generates array from seed value
export default function unfold<T, U>(
	fn: (seed: T) => readonly [U, T] | null,
) {
	return function unfoldFromSeed(
		seed: T | null | undefined,
	): Array<U> {
		if (isNullish(seed)) {
			return []
		}

		// Build array using recursion
		function unfoldRecursive(currentSeed: T): Array<U> {
			const result = fn(currentSeed)

			if (isNull(result)) {
				return []
			}

			const [value, nextSeed] = result
			return [value, ...unfoldRecursive(nextSeed)]
		}

		return unfoldRecursive(seed)
	}
}
