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
 * // Compare with liftA2 (Cartesian product)
 * // liftA2(add)([1, 2, 3])([10, 20, 30])
 * // would give [11, 21, 31, 12, 22, 32, 13, 23, 33]
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
 * liftedAdd([1, 2])([10, 20, 30, 40])
 * // [11, 22]
 * // Extra elements in second array are ignored
 * 
 * // Empty array handling
 * liftedAdd([])([1, 2, 3])  // []
 * liftedAdd([1, 2, 3])([])  // []
 * 
 * // Single element arrays
 * liftedAdd([5])([10])  // [15]
 * 
 * // Boolean operations
 * const and = (a: boolean, b: boolean) => a && b
 * const liftedAnd = liftBinary(and)
 * 
 * liftedAnd([true, true, false, false])
 *          ([true, false, true, false])
 * // [true, false, false, false]
 * 
 * // Division with safety check
 * const safeDivide = (a: number, b: number) => 
 *   b === 0 ? null : a / b
 * const liftedDivide = liftBinary(safeDivide)
 * 
 * liftedDivide([10, 20, 30])([2, 0, 5])
 * // [5, null, 6]
 * 
 * // Coordinate operations
 * const distance = (p1: [number, number], p2: [number, number]) => 
 *   Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
 * const liftedDistance = liftBinary(distance)
 * 
 * liftedDistance([[0, 0], [1, 1]])([[3, 4], [4, 5]])
 * // [5, 5]
 * // Distance from (0,0) to (3,4) and from (1,1) to (4,5)
 * 
 * // Date calculations
 * const daysBetween = (d1: Date, d2: Date) => 
 *   Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
 * const liftedDaysBetween = liftBinary(daysBetween)
 * 
 * liftedDaysBetween([
 *   new Date("2024-01-01"),
 *   new Date("2024-01-15")
 * ])([
 *   new Date("2024-01-10"),
 *   new Date("2024-02-01")
 * ])
 * // [9, 17]
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
 * // Statistical operations
 * const covariance = (x: number, y: number) => x * y  // simplified
 * const liftedCovariance = liftBinary(covariance)
 * 
 * liftedCovariance([1, 2, 3, 4])([2, 4, 6, 8])
 * // [2, 8, 18, 32]
 * 
 * // Curried usage
 * const curriedLiftedAdd = liftBinary(add)
 * const addTo123 = curriedLiftedAdd([1, 2, 3])
 * 
 * addTo123([10, 20, 30])  // [11, 22, 33]
 * addTo123([5, 5, 5])     // [6, 7, 8]
 * 
 * // Validation pairing
 * const validatePair = (value: any, validator: (v: any) => boolean) => 
 *   validator(value)
 * const liftedValidate = liftBinary(validatePair)
 * 
 * liftedValidate([5, "hello", true])([
 *   (v: any) => typeof v === "number",
 *   (v: any) => typeof v === "string",
 *   (v: any) => typeof v === "boolean"
 * ])
 * // [true, true, true]
 * 
 * // CSS property pairing
 * const cssProperty = (prop: string, value: string) => 
 *   `${prop}: ${value};`
 * const liftedCss = liftBinary(cssProperty)
 * 
 * liftedCss(["color", "background", "border"])
 *          (["red", "blue", "1px solid black"])
 * // ["color: red;", "background: blue;", "border: 1px solid black;"]
 * ```
 * @property Functor-mapping - maps binary function over paired elements
 * @property Pairwise - combines elements at same indices, not all combinations
 * @property Length-matching - result length is minimum of input lengths
 */
const liftBinary = <A, B, R>(
	fn: (a: A, b: B) => R
) => (
	fa: ReadonlyArray<A>
) => (
	fb: ReadonlyArray<B>
): Array<R> => {
	const result: Array<R> = []
	const minLength = Math.min(fa.length, fb.length)
	
	for (let i = 0; i < minLength; i++) {
		result.push(fn(fa[i], fb[i]))
	}
	
	return result
}

export default liftBinary