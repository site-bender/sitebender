import isNullish from "../../validation/isNullish/index.ts"

/**
 * Extracts the third element from a tuple or array
 *
 * Type-safe function that extracts the third element from Triple or longer
 * tuples/arrays. For tuples, the return type is precisely inferred.
 * Returns null for arrays with fewer than 3 elements or invalid inputs.
 *
 * This function provides stronger type inference than generic array access
 * when used with tuples, as it preserves the exact type of the third element.
 *
 * @param tuple - A tuple or array with at least 3 elements
 * @returns The third element, or undefined if the input has fewer than 3 elements
 * @example
 * ```typescript
 * // Basic usage
 * third([10, 20, 30])       // 30
 * third(["a", "b", "c"])    // "c"
 * third([1, 2, 3, 4, 5])    // 3
 *
 * // Type inference with tuples
 * import type { Triple } from "../../../types/tuple"
 * const t: Triple<boolean, string, number> = [true, "test", 99]
 * third(t)  // 99 (inferred as number)
 *
 * // Edge cases
 * third([1, 2])     // undefined
 * third([1])        // undefined
 * third([])         // undefined
 * third(null)       // undefined
 * third(undefined)  // undefined
 *
 * // With map for extracting thirds
 * import map from "../../array/map"
 * const triples = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * map(third)(triples)  // [3, 6, 9]
 *
 * // Practical: RGB color extraction
 * type RGB = Triple<number, number, number>
 * const color: RGB = [255, 128, 64]
 * third(color)  // 64 (blue component)
 * ```
 * @pure
 * @safe
 */
const third = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(tuple) || !Array.isArray(tuple) || tuple.length < 3) {
		return undefined
	}

	return tuple[2]
}

export default third
