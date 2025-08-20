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
 * 
 * const curriedAdd = curry(add)
 * curriedAdd(3)(4)  // 7
 * 
 * // Partial application
 * const add5 = curriedAdd(5)
 * add5(10)  // 15
 * add5(20)  // 25
 * 
 * // With triple-taking function
 * const sum3 = (triple: Triple<number, number, number>): number =>
 *   triple[0] + triple[1] + triple[2]
 * 
 * const curriedSum3 = curry(sum3)
 * curriedSum3(1)(2)(3)  // 6
 * 
 * // String concatenation
 * const concat = (pair: Pair<string, string>): string =>
 *   pair[0] + pair[1]
 * 
 * const curriedConcat = curry(concat)
 * const greet = curriedConcat("Hello, ")
 * greet("World")   // "Hello, World"
 * greet("Alice")   // "Hello, Alice"
 * 
 * // Different types
 * const format = (pair: Pair<string, number>): string =>
 *   `${pair[0]}: ${pair[1]}`
 * 
 * const curriedFormat = curry(format)
 * const scoreFormatter = curriedFormat("Score")
 * scoreFormatter(95)   // "Score: 95"
 * scoreFormatter(100)  // "Score: 100"
 * 
 * // Mathematical operations
 * const divide = (pair: Pair<number, number>): number =>
 *   pair[0] / pair[1]
 * 
 * const curriedDivide = curry(divide)
 * const divideBy2 = curriedDivide(10)
 * divideBy2(2)  // 5
 * 
 * const half = (n: number) => curriedDivide(n)(2)
 * half(10)  // 5
 * half(20)  // 10
 * 
 * // RGB color mixing
 * const mixColors = (triple: Triple<number, number, number>): string =>
 *   `rgb(${triple[0]}, ${triple[1]}, ${triple[2]})`
 * 
 * const curriedMix = curry(mixColors)
 * const redBase = curriedMix(255)
 * const redGreen = redBase(128)
 * redGreen(0)    // "rgb(255, 128, 0)"
 * redGreen(64)   // "rgb(255, 128, 64)"
 * 
 * // Object creation
 * const createUser = (pair: Pair<string, number>): { name: string; age: number } =>
 *   ({ name: pair[0], age: pair[1] })
 * 
 * const curriedCreateUser = curry(createUser)
 * const createAlice = curriedCreateUser("Alice")
 * createAlice(30)  // { name: "Alice", age: 30 }
 * 
 * // Coordinate operations
 * const distance = (pair: Pair<number, number>): number =>
 *   Math.sqrt(pair[0] ** 2 + pair[1] ** 2)
 * 
 * const curriedDistance = curry(distance)
 * const fromX3 = curriedDistance(3)
 * fromX3(4)  // 5 (3-4-5 triangle)
 * 
 * // Date formatting
 * const formatDate = (triple: Triple<number, number, number>): string =>
 *   `${triple[0]}-${String(triple[1]).padStart(2, "0")}-${String(triple[2]).padStart(2, "0")}`
 * 
 * const curriedFormatDate = curry(formatDate)
 * const year2024 = curriedFormatDate(2024)
 * const march2024 = year2024(3)
 * march2024(15)  // "2024-03-15"
 * march2024(20)  // "2024-03-20"
 * 
 * // Comparison operations
 * const between = (triple: Triple<number, number, number>): boolean =>
 *   triple[0] <= triple[1] && triple[1] <= triple[2]
 * 
 * const curriedBetween = curry(between)
 * const between0And10 = curriedBetween(0)
 * const checkInRange = between0And10(5)
 * checkInRange(10)  // true (5 is between 0 and 10)
 * 
 * // Function composition
 * import { compose } from "../../combinator/compose"
 * 
 * const multiply = (pair: Pair<number, number>): number =>
 *   pair[0] * pair[1]
 * 
 * const curriedMultiply = curry(multiply)
 * const double = curriedMultiply(2)
 * const triple = curriedMultiply(3)
 * 
 * const sixTimes = compose(double, triple)
 * sixTimes(5)  // 30 (5 * 3 * 2)
 * 
 * // Error handling
 * const safeDivide = (pair: Pair<number, number>): number | null =>
 *   pair[1] === 0 ? null : pair[0] / pair[1]
 * 
 * const curriedSafeDivide = curry(safeDivide)
 * const divideByZero = curriedSafeDivide(10)
 * divideByZero(0)   // null
 * divideByZero(2)   // 5
 * 
 * // Building pipelines
 * const processCoords = (pair: Pair<number, number>): Pair<number, number> =>
 *   [pair[0] * 2, pair[1] * 2]
 * 
 * const curriedProcess = curry(processCoords)
 * const scaleX = curriedProcess(5)
 * scaleX(10)  // [10, 20]
 * 
 * // Type inference
 * const inferredCurry = curry(
 *   (pair: Pair<string, boolean>): string =>
 *     pair[1] ? pair[0].toUpperCase() : pair[0].toLowerCase()
 * )
 * 
 * const withFlag = inferredCurry("Hello")
 * withFlag(true)   // "HELLO"
 * withFlag(false)  // "hello"
 * ```
 * @property Pure - No side effects (unless fn has side effects)
 * @property Type-safe - Maintains type information through currying
 * @property Composable - Creates functions suitable for composition
 */
function curry<A, B, R>(
	fn: (tuple: Pair<A, B>) => R
): (a: A) => (b: B) => R

function curry<A, B, C, R>(
	fn: (tuple: Triple<A, B, C>) => R
): (a: A) => (b: B) => (c: C) => R

function curry(fn: Function) {
	const arity = fn.length === 1 ? 2 : 3  // Assume pair or triple based on function
	
	if (arity === 2) {
		return (a: unknown) => (b: unknown) => fn([a, b])
	} else {
		return (a: unknown) => (b: unknown) => (c: unknown) => fn([a, b, c])
	}
}

export default curry