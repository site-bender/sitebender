/**
 * Lifts a unary function to work with functors
 * 
 * Takes a unary function and returns a new function that maps it over
 * a functor value (like an Array). This is essentially the standard map
 * operation, but provided for completeness alongside liftBinary and
 * liftTernary. For Arrays, it applies the function to each element.
 * 
 * @param fn - Unary function to lift
 * @returns Function that maps over a functor
 * @example
 * ```typescript
 * // Basic arithmetic
 * const double = (x: number) => x * 2
 * const liftedDouble = liftUnary(double)
 * 
 * liftedDouble([1, 2, 3, 4, 5])
 * // [2, 4, 6, 8, 10]
 * 
 * // String operations
 * const toUpper = (s: string) => s.toUpperCase()
 * const liftedToUpper = liftUnary(toUpper)
 * 
 * liftedToUpper(["hello", "world", "typescript"])
 * // ["HELLO", "WORLD", "TYPESCRIPT"]
 * 
 * // Boolean negation
 * const not = (b: boolean) => !b
 * const liftedNot = liftUnary(not)
 * 
 * liftedNot([true, false, true, false])
 * // [false, true, false, true]
 * 
 * // Square root
 * const sqrt = (n: number) => Math.sqrt(n)
 * const liftedSqrt = liftUnary(sqrt)
 * 
 * liftedSqrt([1, 4, 9, 16, 25])
 * // [1, 2, 3, 4, 5]
 * 
 * // Empty array handling
 * liftedDouble([])  // []
 * 
 * // Single element
 * liftedDouble([42])  // [84]
 * 
 * // Type conversions
 * const toString = (n: number) => n.toString()
 * const liftedToString = liftUnary(toString)
 * 
 * liftedToString([1, 2, 3])
 * // ["1", "2", "3"]
 * 
 * // Object property extraction
 * const getName = (obj: { name: string }) => obj.name
 * const liftedGetName = liftUnary(getName)
 * 
 * liftedGetName([
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Carol", age: 35 }
 * ])
 * // ["Alice", "Bob", "Carol"]
 * 
 * // Date operations
 * const getYear = (d: Date) => d.getFullYear()
 * const liftedGetYear = liftUnary(getYear)
 * 
 * liftedGetYear([
 *   new Date("2024-01-01"),
 *   new Date("2025-06-15"),
 *   new Date("2026-12-31")
 * ])
 * // [2024, 2025, 2026]
 * 
 * // Validation
 * const isPositive = (n: number) => n > 0
 * const liftedIsPositive = liftUnary(isPositive)
 * 
 * liftedIsPositive([-5, 0, 5, 10, -10])
 * // [false, false, true, true, false]
 * 
 * // Parsing
 * const parseIntBase10 = (s: string) => parseInt(s, 10)
 * const liftedParseInt = liftUnary(parseIntBase10)
 * 
 * liftedParseInt(["10", "20", "30", "40"])
 * // [10, 20, 30, 40]
 * 
 * // Formatting
 * const formatCurrency = (n: number) => `$${n.toFixed(2)}`
 * const liftedFormatCurrency = liftUnary(formatCurrency)
 * 
 * liftedFormatCurrency([10, 99.99, 150.5, 0.99])
 * // ["$10.00", "$99.99", "$150.50", "$0.99"]
 * 
 * // Array length
 * const length = <T>(arr: Array<T>) => arr.length
 * const liftedLength = liftUnary(length)
 * 
 * liftedLength([
 *   [1, 2, 3],
 *   [],
 *   [4, 5],
 *   [6, 7, 8, 9]
 * ])
 * // [3, 0, 2, 4]
 * 
 * // Function composition
 * const compose = <A, B>(f: (a: A) => B) => (g: (x: any) => A) => 
 *   (x: any) => f(g(x))
 * const doubleAfter = compose(double)
 * const liftedCompose = liftUnary(doubleAfter)
 * 
 * liftedCompose([
 *   (x: number) => x + 1,
 *   (x: number) => x * 3,
 *   (x: number) => x - 2
 * ])
 * // Functions that double their results
 * 
 * // Safe operations with null handling
 * const safeReciprocal = (n: number) => n === 0 ? null : 1 / n
 * const liftedReciprocal = liftUnary(safeReciprocal)
 * 
 * liftedReciprocal([1, 2, 0, 4, 0.5])
 * // [1, 0.5, null, 0.25, 2]
 * 
 * // Chaining lifted operations
 * const liftedDouble2 = liftUnary(double)
 * const liftedToString2 = liftUnary(toString)
 * 
 * const nums = [1, 2, 3]
 * const doubled = liftedDouble2(nums)        // [2, 4, 6]
 * const strings = liftedToString2(doubled)   // ["2", "4", "6"]
 * 
 * // URL encoding
 * const encode = (s: string) => encodeURIComponent(s)
 * const liftedEncode = liftUnary(encode)
 * 
 * liftedEncode(["hello world", "foo&bar", "100%"])
 * // ["hello%20world", "foo%26bar", "100%25"]
 * 
 * // Regular expression testing
 * const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
 * const liftedIsEmail = liftUnary(isEmail)
 * 
 * liftedIsEmail([
 *   "user@example.com",
 *   "invalid.email",
 *   "another@test.org"
 * ])
 * // [true, false, true]
 * 
 * // Color conversion
 * const hexToRgb = (hex: string) => {
 *   const num = parseInt(hex.replace("#", ""), 16)
 *   return {
 *     r: (num >> 16) & 255,
 *     g: (num >> 8) & 255,
 *     b: num & 255
 *   }
 * }
 * const liftedHexToRgb = liftUnary(hexToRgb)
 * 
 * liftedHexToRgb(["#FF0000", "#00FF00", "#0000FF"])
 * // [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }, { r: 0, g: 0, b: 255 }]
 * 
 * // Mathematical operations
 * const factorial = (n: number): number => 
 *   n <= 1 ? 1 : n * factorial(n - 1)
 * const liftedFactorial = liftUnary(factorial)
 * 
 * liftedFactorial([0, 1, 2, 3, 4, 5])
 * // [1, 1, 2, 6, 24, 120]
 * 
 * // Path manipulation
 * const basename = (path: string) => path.split("/").pop() || ""
 * const liftedBasename = liftUnary(basename)
 * 
 * liftedBasename([
 *   "/home/user/file.txt",
 *   "/usr/bin/node",
 *   "/var/log/"
 * ])
 * // ["file.txt", "node", ""]
 * ```
 * @property Functor-mapping - standard map operation over a functor
 * @property Identity-preserving - liftUnary(id) acts as identity on arrays
 * @property Composition-friendly - lifted functions compose naturally
 */
const liftUnary = <A, R>(
	fn: (a: A) => R
) => (
	fa: ReadonlyArray<A>
): Array<R> => {
	return fa.map(fn)
}

export default liftUnary