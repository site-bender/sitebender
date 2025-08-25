/**
 * Lifts a binary function to work with functors
 *
 * Takes a binary function and returns a new function that maps it over
 * two functor values (like Arrays). Unlike liftA2 which creates Cartesian
 * products, liftBinary applies the function pairwise to corresponding
 * elements. For Arrays, it's essentially zipWith - combining elements
 * at the same index from two arrays.
 *
 * @param fn - Binary function to lift
 * @returns Function that maps over two functors pairwise
 * @example
 * ```typescript
 * // Basic arithmetic - pairwise operations
 * const add = (a: number, b: number) => a + b
 * const liftedAdd = liftBinary(add)
 *
 * liftedAdd([1, 2, 3])([10, 20, 30])
 * // [11, 22, 33]
 * // Pairs: 1+10, 2+20, 3+30 (NOT Cartesian product)
 *
 * // String operations - pairwise
 * const concat = (a: string, b: string) => `${a}${b}`
 * const liftedConcat = liftBinary(concat)
 *
 * liftedConcat(["Hello", "Good", "Hi"])([" World", " Morning", " There"])
 * // ["Hello World", "Good Morning", "Hi There"]
 *
 * // Comparison operations
 * const max = (a: number, b: number) => Math.max(a, b)
 * const liftedMax = liftBinary(max)
 *
 * liftedMax([1, 5, 3])([4, 2, 8])
 * // [4, 5, 8]
 * // Takes max of each pair: max(1,4), max(5,2), max(3,8)
 *
 * // Object merging
 * const merge = (a: Record<string, any>, b: Record<string, any>) =>
 *   ({ ...a, ...b })
 * const liftedMerge = liftBinary(merge)
 *
 * liftedMerge([
 *   { name: "Alice" },
 *   { name: "Bob" }
 * ])([
 *   { age: 30 },
 *   { age: 25 }
 * ])
 * // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
 *
 * // Different length arrays - stops at shorter length
 * liftedAdd([1, 2, 3, 4, 5])([10, 20])
 * // [11, 22]
 * // Only processes pairs while both arrays have elements
 *
 * // Boolean operations
 * const and = (a: boolean, b: boolean) => a && b
 * const liftedAnd = liftBinary(and)
 *
 * liftedAnd([true, true, false, false])
 *          ([true, false, true, false])
 * // [true, false, false, false]
 *
 * // Array pairing
 * const makePair = <A, B>(a: A, b: B): [A, B] => [a, b]
 * const liftedPair = liftBinary(makePair)
 *
 * liftedPair(["a", "b", "c"])([1, 2, 3])
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Creating records from parallel arrays
 * const makeRecord = (key: string, value: number) => ({ [key]: value })
 * const liftedMakeRecord = liftBinary(makeRecord)
 *
 * liftedMakeRecord(["foo", "bar", "baz"])([1, 2, 3])
 * // [{ foo: 1 }, { bar: 2 }, { baz: 3 }]
 *
 * // Empty array handling
 * liftedAdd([])([1, 2, 3])  // []
 * liftedAdd([1, 2, 3])([])  // []
 *
 * // Single element arrays
 * liftedAdd([5])([10])  // [15]
 * ```
 * @pure
 * @curried
 */
const liftBinary = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => {
	const minLength = Math.min(fa.length, fb.length)
	return Array.from({ length: minLength }, (_, i) => fn(fa[i], fb[i]))
}

export default liftBinary
