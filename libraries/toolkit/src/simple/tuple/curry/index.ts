import type { Pair, Triple } from "../../../types/tuple/index.ts"

/**
 * Converts a function that takes a tuple into a curried function
 *
 * Transforms a function that expects a tuple argument (Pair or Triple)
 * into a curried function that takes arguments one at a time. This allows
 * for partial application and more flexible function composition.
 *
 * @param fn - A function that takes a tuple as its argument
 * @returns A curried version of the function
 * @example
 * ```typescript
 * // With pair-taking function
 * const add = (pair: Pair<number, number>): number =>
 *   pair[0] + pair[1]
 * const curriedAdd = curry(add)
 * curriedAdd(3)(4) // 7
 *
 * // Partial application
 * const add5 = curriedAdd(5)
 * add5(10) // 15
 *
 * // With triple-taking function
 * const sum3 = (triple: Triple<number, number, number>): number =>
 *   triple[0] + triple[1] + triple[2]
 * const curriedSum3 = curry(sum3)
 * curriedSum3(1)(2)(3) // 6
 *
 * // String concatenation
 * const concat = (pair: Pair<string, string>): string =>
 *   pair[0] + pair[1]
 * const curriedConcat = curry(concat)
 * const greet = curriedConcat("Hello, ")
 * greet("World") // "Hello, World"
 *
 * // Different types
 * const format = (pair: Pair<string, number>): string =>
 *   `${pair[0]}: ${pair[1]}`
 * const scoreFormatter = curry(format)("Score")
 * scoreFormatter(95) // "Score: 95"
 * ```
 * @pure
 */
function curry<A, B, R>(
	fn: (tuple: Pair<A, B>) => R,
): (a: A) => (b: B) => R

function curry<A, B, C, R>(
	fn: (tuple: Triple<A, B, C>) => R,
): (a: A) => (b: B) => (c: C) => R

function curry(fn: Function) {
	const arity = fn.length === 1 ? 2 : 3 // Assume pair or triple based on function

	if (arity === 2) {
		return (a: unknown) => (b: unknown) => fn([a, b])
	} else {
		return (a: unknown) => (b: unknown) => (c: unknown) => fn([a, b, c])
	}
}

export default curry
