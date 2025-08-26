/**
 * Groups array elements by the result of a key function
 *
 * Creates an object where keys are the results of the key function and
 * values are arrays of elements that produced that key. Useful for
 * categorizing, indexing, or aggregating data.
 *
 * @pure
 * @immutable
 * @curried
 * @param keyFn - Function that returns a grouping key for each element
 * @param array - Array to group
 * @returns Object with keys as group identifiers and values as element arrays
 * @example
 * ```typescript
 * // Basic usage
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 30 }
 * ]
 * groupBy(p => p.age)(people)
 * // { 25: [Bob], 30: [Alice, Charlie] }
 *
 * // Group by computed value
 * groupBy((x: number) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5])
 * // { odd: [1, 3, 5], even: [2, 4] }
 *
 * // Partial application
 * const groupByType = groupBy((item: { type: string }) => item.type)
 * groupByType([{ type: "A", value: 1 }, { type: "B", value: 2 }])
 * // { A: [{ type: "A", value: 1 }], B: [{ type: "B", value: 2 }] }
 * ```
 */
const groupBy = <T, K extends string | number>(
	keyFn: (element: T) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<string, Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return {}
	}

	return array.reduce((acc: Record<string, Array<T>>, element: T) => {
		const key = String(keyFn(element))

		return {
			...acc,
			[key]: [...(acc[key] || []), element],
		}
	}, {})
}

export default groupBy
