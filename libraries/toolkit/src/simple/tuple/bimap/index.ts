import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Maps two different functions over the elements of a pair
 *
 * Applies the first function to the first element and the second function
 * to the second element of a pair, returning a new pair with the transformed
 * values. This is useful when each element of a pair needs different
 * transformations.
 *
 * The function is curried to allow partial application and composition.
 *
 * @param fnSecond - Function to apply to the second element
 * @param fnFirst - Function to apply to the first element
 * @param pair - The pair to transform
 * @returns A new pair with transformed elements
 * @example
 * ```typescript
 * // Basic transformation
 * bimap(
 *   (s: string) => s.length
 * )(
 *   (n: number) => n * 2
 * )([5, "hello"]) // [10, 5]
 *
 * // Different type transformations
 * bimap(
 *   (b: boolean) => b ? "yes" : "no"
 * )(
 *   (n: number) => n.toString()
 * )([42, true]) // ["42", "yes"]
 *
 * // Key-value pair transformation
 * type Entry = Pair<string, number>
 * bimap(
 *   (v: number) => v / 100
 * )(
 *   (k: string) => k.toUpperCase()
 * )(["score", 95] as Entry) // ["SCORE", 0.95]
 *
 * // Invalid inputs
 * bimap((x: number) => x * 2)((x: number) => x + 1)(null)
 * // [undefined, undefined]
 *
 * // Partial application
 * const processEntry = bimap((v: number) => v * 1.1)
 * const withTax = processEntry((k: string) => `taxed_${k}`)
 * withTax(["price", 100]) // ["taxed_price", 110]
 * ```
 * @pure
 * @curried
 */
const bimap = <U, V>(
	fnSecond: (value: U) => V,
) =>
<S, T>(
	fnFirst: (value: S) => T,
) =>
(
	pair: Pair<S, U> | null | undefined,
): Pair<T, V> => {
	if (pair == null || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<T, V>
	}

	return [
		fnFirst(pair[0]),
		fnSecond(pair[1]),
	]
}

export default bimap
