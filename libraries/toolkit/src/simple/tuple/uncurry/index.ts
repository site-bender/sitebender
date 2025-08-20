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
 * // With curried binary function
 * const curriedAdd = (a: number) => (b: number): number => a + b
 * const tupleAdd = uncurry(curriedAdd)
 * tupleAdd([3, 4])  // 7
 * 
 * // With curried ternary function
 * const curriedSum3 = (a: number) => (b: number) => (c: number): number =>
 *   a + b + c
 * const tupleSum3 = uncurry(curriedSum3)
 * tupleSum3([1, 2, 3])  // 6
 * 
 * // String operations
 * const curriedConcat = (prefix: string) => (suffix: string): string =>
 *   prefix + suffix
 * const tupleConcat = uncurry(curriedConcat)
 * tupleConcat(["Hello, ", "World"])  // "Hello, World"
 * 
 * // Different types
 * const curriedFormat = (label: string) => (value: number): string =>
 *   `${label}: ${value}`
 * const tupleFormat = uncurry(curriedFormat)
 * tupleFormat(["Score", 95])  // "Score: 95"
 * 
 * // Mathematical operations
 * const curriedMultiply = (x: number) => (y: number): number => x * y
 * const tupleMultiply = uncurry(curriedMultiply)
 * tupleMultiply([6, 7])  // 42
 * 
 * // Working with existing curried functions
 * import { curry as curriedCurry } from "../../combinator/curry"
 * 
 * const add = (a: number, b: number) => a + b
 * const curriedAddFn = curriedCurry(add)
 * const tupleAddFn = uncurry(curriedAddFn)
 * tupleAddFn([10, 20])  // 30
 * 
 * // RGB color creation
 * const curriedRgb = (r: number) => (g: number) => (b: number): string =>
 *   `rgb(${r}, ${g}, ${b})`
 * const tupleRgb = uncurry(curriedRgb)
 * tupleRgb([255, 128, 0])  // "rgb(255, 128, 0)"
 * 
 * // Object creation
 * const curriedUser = (name: string) => (age: number) =>
 *   ({ name, age })
 * const tupleUser = uncurry(curriedUser)
 * tupleUser(["Alice", 30])  // { name: "Alice", age: 30 }
 * 
 * // Coordinate operations
 * const curriedDistance = (x: number) => (y: number): number =>
 *   Math.sqrt(x ** 2 + y ** 2)
 * const tupleDistance = uncurry(curriedDistance)
 * tupleDistance([3, 4])  // 5
 * 
 * // Date creation
 * const curriedDate = (year: number) => (month: number) => (day: number): string =>
 *   `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
 * const tupleDate = uncurry(curriedDate)
 * tupleDate([2024, 3, 15])  // "2024-03-15"
 * 
 * // Comparison operations
 * const curriedBetween = (min: number) => (value: number) => (max: number): boolean =>
 *   min <= value && value <= max
 * const tupleBetween = uncurry(curriedBetween)
 * tupleBetween([0, 5, 10])  // true
 * 
 * // Function composition with tuples
 * import { compose } from "../../combinator/compose"
 * import { pair } from "../pair"
 * 
 * const curriedDivide = (x: number) => (y: number): number => x / y
 * const tupleDivide = uncurry(curriedDivide)
 * 
 * const process = compose(
 *   (n: number) => n.toFixed(2),
 *   tupleDivide
 * )
 * process([10, 3])  // "3.33"
 * 
 * // Error handling
 * const curriedSafeDivide = (x: number) => (y: number): number | null =>
 *   y === 0 ? null : x / y
 * const tupleSafeDivide = uncurry(curriedSafeDivide)
 * tupleSafeDivide([10, 0])   // null
 * tupleSafeDivide([10, 2])   // 5
 * 
 * // Round-trip with curry
 * import { curry as tupleCurry } from "../curry"
 * 
 * const original = (pair: Pair<string, number>): string =>
 *   `${pair[0]}: ${pair[1]}`
 * const curried = tupleCurry(original)
 * const uncurried = uncurry(curried)
 * 
 * uncurried(["Test", 42])  // "Test: 42"
 * // Same as original(["Test", 42])
 * 
 * // Adapting library functions
 * const libraryFn = (a: string) => (b: string) => (c: string): string =>
 *   [a, b, c].join("-")
 * const tupleFn = uncurry(libraryFn)
 * tupleFn(["one", "two", "three"])  // "one-two-three"
 * 
 * // Conditional logic
 * const curriedIf = (condition: boolean) => (ifTrue: string) => (ifFalse: string): string =>
 *   condition ? ifTrue : ifFalse
 * const tupleIf = uncurry(curriedIf)
 * tupleIf([true, "Yes", "No"])   // "Yes"
 * tupleIf([false, "Yes", "No"])  // "No"
 * 
 * // Array operations with tuples
 * const pairs: Array<Pair<number, number>> = [
 *   [1, 2],
 *   [3, 4],
 *   [5, 6]
 * ]
 * const results = pairs.map(uncurry((x: number) => (y: number) => x + y))
 * // [3, 7, 11]
 * 
 * // Type preservation
 * const typedCurried = (s: string) => (n: number) => (b: boolean): string =>
 *   b ? s.repeat(n) : s
 * 
 * const typedTuple = uncurry(typedCurried)
 * typedTuple(["Hi", 3, true])   // "HiHiHi"
 * typedTuple(["Hi", 3, false])  // "Hi"
 * ```
 * @property Pure - No side effects (unless fn has side effects)
 * @property Type-safe - Maintains type information through uncurrying
 * @property Inverse of curry - uncurry(curry(f)) ≈ f
 */
function uncurry<A, B, R>(
	fn: (a: A) => (b: B) => R
): (tuple: Pair<A, B>) => R

function uncurry<A, B, C, R>(
	fn: (a: A) => (b: B) => (c: C) => R
): (tuple: Triple<A, B, C>) => R

function uncurry(fn: Function) {
	// Try to detect arity by calling with test values
	try {
		const test = fn(undefined)
		if (typeof test === "function") {
			const test2 = test(undefined)
			if (typeof test2 === "function") {
				// Ternary function
				return (tuple: Triple<unknown, unknown, unknown>) => 
					fn(tuple[0])(tuple[1])(tuple[2])
			} else {
				// Binary function
				return (tuple: Pair<unknown, unknown>) => 
					fn(tuple[0])(tuple[1])
			}
		}
	} catch {
		// Default to binary if detection fails
		return (tuple: Pair<unknown, unknown>) => 
			fn(tuple[0])(tuple[1])
	}
	
	// Default to binary
	return (tuple: Pair<unknown, unknown>) => 
		fn(tuple[0])(tuple[1])
}

export default uncurry