/**
 * Lifts a ternary function to work with applicative functors
 * 
 * Takes a function of three arguments and returns a new function that works
 * with values wrapped in applicative functors (like Arrays). For Arrays, it
 * applies the function to all combinations of elements from the three arrays
 * (Cartesian product). This is a specialized version of lift for exactly
 * three arguments, providing better type safety and clarity.
 * 
 * @param fn - Ternary function to lift
 * @returns Function that works with three wrapped values
 * @example
 * ```typescript
 * // Basic arithmetic with three arrays
 * const sum3 = (a: number, b: number, c: number) => a + b + c
 * const liftedSum3 = liftA3(sum3)
 * 
 * liftedSum3([1, 2])([10, 20])([100])
 * // [111, 121, 112, 122]
 * // Applies: 1+10+100, 1+20+100, 2+10+100, 2+20+100
 * 
 * // String formatting
 * const format = (greeting: string, name: string, punct: string) => 
 *   `${greeting}, ${name}${punct}`
 * const liftedFormat = liftA3(format)
 * 
 * liftedFormat(["Hello", "Hi"])
 *             (["Alice", "Bob"])
 *             (["!", "."])
 * // ["Hello, Alice!", "Hello, Alice.", "Hello, Bob!", "Hello, Bob.",
 * //  "Hi, Alice!", "Hi, Alice.", "Hi, Bob!", "Hi, Bob."]
 * 
 * // RGB color combinations
 * const rgb = (r: number, g: number, b: number) => 
 *   `rgb(${r}, ${g}, ${b})`
 * const liftedRgb = liftA3(rgb)
 * 
 * liftedRgb([0, 128, 255])([0, 128, 255])([0, 128, 255])
 * // All 27 RGB combinations from the given values
 * 
 * // Date creation
 * const makeDate = (year: number, month: number, day: number) => 
 *   new Date(year, month - 1, day)
 * const liftedMakeDate = liftA3(makeDate)
 * 
 * liftedMakeDate([2024, 2025])([1, 6, 12])([1, 15, 31])
 * // All date combinations for the given years, months, and days
 * 
 * // Validation with multiple conditions
 * const isValid = (min: number, max: number, value: number) => 
 *   value >= min && value <= max
 * const liftedValidate = liftA3(isValid)
 * 
 * liftedValidate([0, 10])([100, 50])([25, 75, 5])
 * // Boolean results for all combinations of min, max, and value
 * 
 * // Object construction
 * const makeUser = (id: number, name: string, role: string) => ({
 *   id,
 *   name,
 *   role,
 *   created: new Date()
 * })
 * const liftedMakeUser = liftA3(makeUser)
 * 
 * liftedMakeUser([1, 2])
 *               (["Alice", "Bob"])
 *               (["admin", "user"])
 * // [
 * //   { id: 1, name: "Alice", role: "admin", ... },
 * //   { id: 1, name: "Alice", role: "user", ... },
 * //   { id: 1, name: "Bob", role: "admin", ... },
 * //   { id: 1, name: "Bob", role: "user", ... },
 * //   { id: 2, name: "Alice", role: "admin", ... },
 * //   { id: 2, name: "Alice", role: "user", ... },
 * //   { id: 2, name: "Bob", role: "admin", ... },
 * //   { id: 2, name: "Bob", role: "user", ... }
 * // ]
 * 
 * // Conditional logic
 * const ifThenElse = <T>(condition: boolean, ifTrue: T, ifFalse: T) => 
 *   condition ? ifTrue : ifFalse
 * const liftedIfThenElse = liftA3(ifThenElse)
 * 
 * liftedIfThenElse([true, false])
 *                 (["YES", "YEAH"])
 *                 (["NO", "NOPE"])
 * // ["YES", "NO", "YEAH", "NOPE", "NO", "NO", "NOPE", "NOPE"]
 * 
 * // Mathematical operations
 * const clamp = (min: number, max: number, value: number) => 
 *   Math.max(min, Math.min(max, value))
 * const liftedClamp = liftA3(clamp)
 * 
 * liftedClamp([0, 5])([10, 15])([3, 8, 12, 20])
 * // All clamped values for each combination
 * 
 * // File path construction
 * const makePath = (dir: string, subdir: string, file: string) => 
 *   `${dir}/${subdir}/${file}`
 * const liftedMakePath = liftA3(makePath)
 * 
 * liftedMakePath(["/home", "/usr"])
 *               (["docs", "images"])
 *               (["file1.txt", "file2.jpg"])
 * // ["/home/docs/file1.txt", "/home/docs/file2.jpg",
 * //  "/home/images/file1.txt", "/home/images/file2.jpg",
 * //  "/usr/docs/file1.txt", "/usr/docs/file2.jpg",
 * //  "/usr/images/file1.txt", "/usr/images/file2.jpg"]
 * 
 * // SQL-like operations
 * const between = (value: any, lower: any, upper: any) => 
 *   value >= lower && value <= upper
 * const liftedBetween = liftA3(between)
 * 
 * liftedBetween([5, 10, 15])([0, 8])([12, 20])
 * // Check which values fall between the given ranges
 * 
 * // Empty array handling
 * liftedSum3([])([1, 2])([3, 4])    // []
 * liftedSum3([1, 2])([])([3, 4])    // []
 * liftedSum3([1, 2])([3, 4])([])    // []
 * 
 * // Single element arrays
 * liftedSum3([1])([2])([3])  // [6]
 * 
 * // Curried application
 * const curriedLiftedSum = liftA3(sum3)
 * const withFirst = curriedLiftedSum([1, 2, 3])
 * const withFirstTwo = withFirst([10, 20])
 * 
 * withFirstTwo([100])  // [111, 121, 112, 122, 113, 123]
 * withFirstTwo([100, 200])  // [111, 211, 121, 221, 112, 212, 122, 222, 113, 213, 123, 223]
 * 
 * // CSS property combinations
 * const cssRule = (property: string, value: string, important: string) =>
 *   `${property}: ${value}${important}`
 * const liftedCssRule = liftA3(cssRule)
 * 
 * liftedCssRule(["color", "background"])
 *              (["red", "blue", "green"])
 *              ([" !important", ""])
 * // All CSS rule combinations
 * 
 * // Temperature conversion scenarios
 * const convert = (value: number, from: string, to: string) => {
 *   // Simplified conversion logic
 *   if (from === "C" && to === "F") return value * 9/5 + 32
 *   if (from === "F" && to === "C") return (value - 32) * 5/9
 *   return value
 * }
 * const liftedConvert = liftA3(convert)
 * 
 * liftedConvert([0, 100])
 *              (["C", "F"])
 *              (["C", "F", "K"])
 * // All conversion combinations
 * 
 * // Database query building
 * const buildQuery = (table: string, column: string, value: any) =>
 *   `SELECT * FROM ${table} WHERE ${column} = '${value}'`
 * const liftedQuery = liftA3(buildQuery)
 * 
 * liftedQuery(["users", "posts"])
 *            (["id", "status"])
 *            ([1, 2, "active"])
 * // All query combinations
 * ```
 * @property Applicative - works with applicative functors (Arrays)
 * @property Cartesian-product - creates all combinations of three inputs
 * @property Type-safe - preserves types through the transformation
 */
const liftA3 = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R
) => (
	fa: ReadonlyArray<A>
) => (
	fb: ReadonlyArray<B>
) => (
	fc: ReadonlyArray<C>
): Array<R> => {
	const result: Array<R> = []
	
	for (const a of fa) {
		for (const b of fb) {
			for (const c of fc) {
				result.push(fn(a, b, c))
			}
		}
	}
	
	return result
}

export default liftA3