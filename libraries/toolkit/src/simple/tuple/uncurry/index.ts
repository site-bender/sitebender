import type { Pair, Triple } from "../../../types/tuple/index.ts"

/**
 * Converts a curried function into a function that takes a tuple
 *
 * Transforms a curried function (that takes arguments one at a time)
 * into a function that expects a single tuple argument (Pair or Triple).
 * This is the inverse of curry and is useful for adapting curried functions
 * to work with tuple-based APIs.
 *
 * @param fn - A curried function
 * @returns A function that takes a tuple as its argument
 * @example
 * ```typescript
 * // Binary function uncurrying
 * const curriedAdd = (a: number) => (b: number): number => a + b
 * const tupleAdd = uncurry(curriedAdd)
 * tupleAdd([3, 4])  // 7
 *
 * // Ternary function uncurrying
 * const curriedSum3 = (a: number) => (b: number) => (c: number): number =>
 *   a + b + c
 * const tupleSum3 = uncurry(curriedSum3)
 * tupleSum3([1, 2, 3])  // 6
 *
 * // Different types
 * const curriedFormat = (label: string) => (value: number): string =>
 *   `${label}: ${value}`
 * const tupleFormat = uncurry(curriedFormat)
 * tupleFormat(["Score", 95])  // "Score: 95"
 *
 * // Composition with tuples
 * import compose from "../../combinator/compose"
 * const curriedDivide = (x: number) => (y: number): number => x / y
 * const tupleDivide = uncurry(curriedDivide)
 * const process = compose(
 *   (n: number) => n.toFixed(2),
 *   tupleDivide
 * )
 * process([10, 3])  // "3.33"
 *
 * // Round-trip with curry
 * import { curry as tupleCurry } from "../curry"
 * const original = (pair: Pair<string, number>): string =>
 *   `${pair[0]}: ${pair[1]}`
 * const curried = tupleCurry(original)
 * const uncurried = uncurry(curried)
 * uncurried(["Test", 42])  // "Test: 42"
 *
 * // Array operations with tuples
 * const pairs: Array<Pair<number, number>> = [[1, 2], [3, 4], [5, 6]]
 * const results = pairs.map(uncurry((x: number) => (y: number) => x + y))
 * // [3, 7, 11]
 * ```
 * @pure
 */
function uncurry<A, B, R>(
	fn: (a: A) => (b: B) => R,
): (tuple: Pair<A, B>) => R

function uncurry<A, B, C, R>(
	fn: (a: A) => (b: B) => (c: C) => R,
): (tuple: Triple<A, B, C>) => R

function uncurry(fn: (a: unknown) => unknown) {
	// Try to detect arity by calling with test values
	try {
		const test = fn(undefined)
		if (typeof test === "function") {
			const test2 = (test as (b: unknown) => unknown)(undefined)
			if (typeof test2 === "function") {
				// Ternary function
				return (tuple: Triple<unknown, unknown, unknown>) =>
					((fn(tuple[0]) as (b: unknown) => (c: unknown) => unknown)(
						tuple[1],
					) as (c: unknown) => unknown)(tuple[2])
			} else {
				// Binary function
				return (tuple: Pair<unknown, unknown>) =>
					(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
			}
		}
	} catch {
		// Default to binary if detection fails
		return (tuple: Pair<unknown, unknown>) =>
			(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
	}

	// Default to binary
	return (tuple: Pair<unknown, unknown>) =>
		(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
}

export default uncurry
