/**
 * Reduces a Map to a single value
 *
 * Applies a reducer function against an accumulator and each entry in the Map
 * (in iteration order) to reduce it to a single value. The reducer receives
 * the accumulator, current value, current key, and the Map itself. This is
 * the fundamental operation for aggregating Map data into summary values,
 * calculations, or transformed structures.
 *
 * @param reducer - Function to execute on each entry
 * @param initial - Initial value for the accumulator
 * @param map - The Map to reduce
 * @returns The final accumulated value
 * @example
 * ```typescript
 * // Sum all values
 * const scores = new Map([["Alice", 85], ["Bob", 92], ["Charlie", 78]])
 * const sum = (acc: number, val: number) => acc + val
 * reduce(sum)(0)(scores)
 * // 255
 *
 * // Build object from Map
 * const config = new Map([["host", "localhost"], ["port", 3000]])
 * reduce(
 *   (acc: any, val: any, key: string) => ({ ...acc, [key]: val })
 * )({})(config)
 * // { host: "localhost", port: 3000 }
 *
 * // Find maximum value
 * const numbers = new Map([["a", 5], ["b", 12], ["c", 8]])
 * reduce((max: number, val: number) => val > max ? val : max)(-Infinity)(numbers)
 * // 12
 *
 * // Count by condition
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }]
 * ])
 * reduce(
 *   (count: number, user: any) => user.active ? count + 1 : count
 * )(0)(users)
 * // 2
 *
 * // Collect values into array
 * const data = new Map([["a", 1], ["b", 2], ["c", 3]])
 * reduce((arr: Array<number>, val: number) => [...arr, val])([])(data)
 * // [1, 2, 3]
 * ```
 * @pure
 * @immutable
 * @curried
 */
const reduce = <K, V, R>(
	reducer: (accumulator: R, value: V, key: K, map: Map<K, V>) => R,
) =>
(initial: R) =>
(map: Map<K, V>): R => {
	return Array.from(map.entries()).reduce(
		(accumulator, [key, value]) => reducer(accumulator, value, key, map),
		initial
	)
}

export default reduce