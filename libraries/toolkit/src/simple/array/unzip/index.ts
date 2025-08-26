/**
 * The opposite of zip - separates an array of pairs into two arrays
 *
 * Takes an array of 2-element tuples and returns a tuple of two arrays,
 * where the first array contains all first elements and the second array
 * contains all second elements. This is the inverse operation of zip.
 * Useful for separating paired data, extracting columns from row data,
 * or decomposing coordinate pairs.
 *
 * @pure
 * @immutable
 * @safe
 * @param pairs - Array of 2-element tuples to unzip
 * @returns Tuple of two arrays [firstElements, secondElements]
 * @example
 * ```typescript
 * // Basic unzipping
 * unzip([[1, "a"], [2, "b"], [3, "c"]])
 * // [[1, 2, 3], ["a", "b", "c"]]
 *
 * // Separate names and ages
 * const people: Array<[string, number]> = [
 *   ["Alice", 25],
 *   ["Bob", 30],
 *   ["Charlie", 35]
 * ]
 * const [names, ages] = unzip(people)
 * // names: ["Alice", "Bob", "Charlie"]
 * // ages: [25, 30, 35]
 *
 * // Empty array
 * unzip([])  // [[], []]
 *
 * // Handle null/undefined
 * unzip(null)       // [[], []]
 * unzip(undefined)  // [[], []]
 *
 * // Extract columns from table data
 * const tableRows: Array<[string, number]> = [
 *   ["Product A", 100],
 *   ["Product B", 200],
 *   ["Product C", 150]
 * ]
 * const [products, prices] = unzip(tableRows)
 * // products: ["Product A", "Product B", "Product C"]
 * // prices: [100, 200, 150]
 * ```
 */
const unzip = <T, U>(
	pairs: ReadonlyArray<readonly [T, U]> | null | undefined,
): [Array<T>, Array<U>] => {
	if (pairs == null || !Array.isArray(pairs) || pairs.length === 0) {
		return [[], []]
	}

	// Recursively extract elements from pairs
	const extractElements = (
		remainingPairs: ReadonlyArray<readonly [T, U]>,
		firstAcc: Array<T> = [],
		secondAcc: Array<U> = [],
	): [Array<T>, Array<U>] => {
		if (remainingPairs.length === 0) {
			return [firstAcc, secondAcc]
		}

		const [head, ...tail] = remainingPairs

		if (!Array.isArray(head) || head.length < 2) {
			return extractElements(tail, firstAcc, secondAcc)
		}

		return extractElements(
			tail,
			[...firstAcc, head[0]],
			[...secondAcc, head[1]],
		)
	}

	return extractElements(pairs)
}

export default unzip
