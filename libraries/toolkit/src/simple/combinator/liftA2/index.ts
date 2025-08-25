/**
 * Lifts a binary function to work with applicative functors
 *
 * Takes a function of two arguments and returns a new function that works
 * with values wrapped in applicative functors (like Arrays, Promises, etc.).
 * For Arrays, it applies the function to all combinations of elements from
 * both arrays (Cartesian product). This is a specialized version of lift
 * for exactly two arguments, providing better type safety.
 *
 * @param fn - Binary function to lift
 * @returns Function that works with two wrapped values
 * @example
 * ```typescript
 * // Basic arithmetic with arrays
 * const add = (a: number, b: number) => a + b
 * const liftedAdd = liftA2(add)
 *
 * liftedAdd([1, 2, 3])([10, 20])
 * // [11, 21, 12, 22, 13, 23]
 * // Applies: 1+10, 1+20, 2+10, 2+20, 3+10, 3+20
 *
 * // String concatenation
 * const concat = (a: string, b: string) => `${a}${b}`
 * const liftedConcat = liftA2(concat)
 *
 * liftedConcat(["Hello", "Hi"])([" World", " There"])
 * // ["Hello World", "Hello There", "Hi World", "Hi There"]
 *
 * // Multiplication table
 * const multiply = (a: number, b: number) => a * b
 * const liftedMultiply = liftA2(multiply)
 *
 * liftedMultiply([1, 2, 3, 4, 5])([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, ...]
 * // Creates multiplication table
 *
 * // Comparison operations
 * const lessThan = (a: number, b: number) => a < b
 * const liftedLessThan = liftA2(lessThan)
 *
 * liftedLessThan([1, 5, 10])([3, 7, 15])
 * // [true, true, true, false, true, true, false, false, true]
 * // Compares: 1<3, 1<7, 1<15, 5<3, 5<7, 5<15, 10<3, 10<7, 10<15
 *
 * // Object creation
 * const makePair = (key: string, value: number) => ({ [key]: value })
 * const liftedMakePair = liftA2(makePair)
 *
 * liftedMakePair(["a", "b", "c"])([1, 2])
 * // [{ a: 1 }, { a: 2 }, { b: 1 }, { b: 2 }, { c: 1 }, { c: 2 }]
 *
 * // Date comparisons
 * const daysBetween = (d1: Date, d2: Date) =>
 *   Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
 * const liftedDaysBetween = liftA2(daysBetween)
 *
 * const dates1 = [new Date("2024-01-01"), new Date("2024-01-15")]
 * const dates2 = [new Date("2024-02-01"), new Date("2024-03-01")]
 * liftedDaysBetween(dates1)(dates2)
 * // Days between all date combinations
 *
 * // Validation combinations
 * const isInRange = (min: number, max: number) =>
 *   (value: number) => value >= min && value <= max
 * const createRangeValidator = liftA2(isInRange)
 *
 * const validators = createRangeValidator([0, 10])([100, 50])
 * // [isInRange(0, 100), isInRange(0, 50), isInRange(10, 100), isInRange(10, 50)]
 *
 * // Path combinations
 * const joinPath = (dir: string, file: string) => `${dir}/${file}`
 * const liftedJoinPath = liftA2(joinPath)
 *
 * liftedJoinPath(["/home", "/usr", "/var"])
 *               (["file1.txt", "file2.txt"])
 * // ["/home/file1.txt", "/home/file2.txt", "/usr/file1.txt", ...]
 *
 * // Curried usage
 * const curriedLiftedAdd = liftA2(add)
 * const addToArray = curriedLiftedAdd([1, 2, 3])
 *
 * addToArray([10])    // [11, 12, 13]
 * addToArray([20])    // [21, 22, 23]
 * addToArray([5, 6])  // [6, 7, 8, 7, 8, 9]
 *
 * // Empty array handling
 * liftedAdd([])([1, 2, 3])  // []
 * liftedAdd([1, 2, 3])([])  // []
 *
 * // Single element arrays
 * liftedAdd([5])([10])  // [15]
 *
 * // Complex calculations
 * const calculatePrice = (quantity: number, unitPrice: number) =>
 *   quantity * unitPrice * 1.1  // with 10% tax
 * const liftedPrice = liftA2(calculatePrice)
 *
 * liftedPrice([1, 2, 5])([10.00, 15.50, 20.00])
 * // All price combinations with tax
 *
 * // Matrix operations
 * const dotProduct = (row: Array<number>, col: Array<number>) =>
 *   row.reduce((sum, val, i) => sum + val * col[i], 0)
 * const liftedDotProduct = liftA2(dotProduct)
 *
 * const matrix1 = [[1, 2], [3, 4]]
 * const matrix2 = [[5, 6], [7, 8]]
 * liftedDotProduct(matrix1)(matrix2)
 * // Dot products of all row-column combinations
 *
 * // Function composition
 * const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) =>
 *   (a: A) => f(g(a))
 * const liftedCompose = liftA2(compose)
 *
 * const funcs1 = [(x: number) => x * 2, (x: number) => x + 1]
 * const funcs2 = [(x: number) => x * x, (x: number) => x - 1]
 * const compositions = liftedCompose(funcs1)(funcs2)
 * // All possible function compositions
 *
 * // Error handling simulation
 * const safeDivide = (a: number, b: number) =>
 *   b === 0 ? null : a / b
 * const liftedDivide = liftA2(safeDivide)
 *
 * liftedDivide([10, 20, 30])([2, 5, 0])
 * // [5, 2, null, 10, 4, null, 15, 6, null]
 * ```
 * @property Applicative - works with applicative functors (Arrays)
 * @property Cartesian-product - creates all combinations of inputs
 * @property Type-safe - preserves types through the transformation
 */
const liftA2 = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => {
	const result: Array<R> = []

	for (const a of fa) {
		for (const b of fb) {
			result.push(fn(a, b))
		}
	}

	return result
}

export default liftA2
