/**
 * Partition object entries by predicate
 *
 * Splits an object into two objects based on a predicate function applied
 * to each key-value pair. Returns a tuple where the first object contains
 * entries that satisfy the predicate and the second contains those that don't.
 * Useful for filtering, separating concerns, and conditional processing.
 *
 * @pure
 * @immutable
 * @curried
 * @param predicate - Function that tests each [key, value] pair
 * @param obj - Object to partition
 * @returns Tuple of two objects: [matching, nonMatching]
 * @example
 * ```typescript
 * // Partition by value
 * const isPositive = ([_, v]: [string, number]) => v > 0
 * partitionBy(isPositive)({ a: 1, b: -2, c: 3, d: -4 })
 * // [{ a: 1, c: 3 }, { b: -2, d: -4 }]
 *
 * // Partition by key
 * const isPrivate = ([k, _]: [string, any]) => k.startsWith("_")
 * partitionBy(isPrivate)({ _id: 1, name: "Alice", _token: "secret" })
 * // [{ _id: 1, _token: "secret" }, { name: "Alice" }]
 *
 * // Partition by type
 * const isString = ([_, v]: [string, any]) => typeof v === "string"
 * partitionBy(isString)({ a: 1, b: "hello", c: true })
 * // [{ b: "hello" }, { a: 1, c: true }]
 *
 * // Destructuring result
 * const isEven = ([_, n]: [string, number]) => n % 2 === 0
 * const [evens, odds] = partitionBy(isEven)({ a: 1, b: 2, c: 3, d: 4 })
 * // evens: { b: 2, d: 4 }, odds: { a: 1, c: 3 }
 *
 * // Edge cases
 * partitionBy(isPositive)({}) // [{}, {}]
 * partitionBy(isPositive)({ a: 1, b: 2 }) // [{ a: 1, b: 2 }, {}]
 * ```
 */
const partitionBy = <K extends string, V>(
	predicate: (entry: [K, V]) => boolean,
) =>
(
	obj: Record<K, V>,
): [Record<K, V>, Record<K, V>] => {
	return (Object.entries(obj) as Array<[K, V]>).reduce(
		([matching, nonMatching], [key, value]) =>
			predicate([key, value])
				? [{ ...matching, [key]: value }, nonMatching]
				: [matching, { ...nonMatching, [key]: value }],
		[{} as Record<K, V>, {} as Record<K, V>],
	)
}

export default partitionBy
