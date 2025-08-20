/**
 * Lifts a ternary function to work with functors
 * 
 * Takes a ternary function and returns a new function that maps it over
 * three functor values (like Arrays). Unlike liftA3 which creates Cartesian
 * products, liftTernary applies the function to corresponding elements at
 * the same index from three arrays. This is the ternary equivalent of
 * zipWith for three arrays.
 * 
 * @param fn - Ternary function to lift
 * @returns Function that maps over three functors element-wise
 * @example
 * ```typescript
 * // Basic arithmetic - element-wise operations
 * const sum3 = (a: number, b: number, c: number) => a + b + c
 * const liftedSum3 = liftTernary(sum3)
 * 
 * liftedSum3([1, 2, 3])([10, 20, 30])([100, 200, 300])
 * // [111, 222, 333]
 * // Triples: 1+10+100, 2+20+200, 3+30+300 (NOT Cartesian product)
 * 
 * // Compare with liftA3 (Cartesian product)
 * // liftA3(sum3)([1, 2, 3])([10, 20, 30])([100, 200, 300])
 * // would give all 27 combinations
 * 
 * // String formatting - element-wise
 * const format = (greeting: string, name: string, punct: string) => 
 *   `${greeting}, ${name}${punct}`
 * const liftedFormat = liftTernary(format)
 * 
 * liftedFormat(["Hello", "Hi", "Hey"])
 *             (["Alice", "Bob", "Carol"])
 *             (["!", ".", "?"])
 * // ["Hello, Alice!", "Hi, Bob.", "Hey, Carol?"]
 * 
 * // RGB color creation
 * const rgb = (r: number, g: number, b: number) => 
 *   `rgb(${r}, ${g}, ${b})`
 * const liftedRgb = liftTernary(rgb)
 * 
 * liftedRgb([255, 128, 0])([0, 128, 255])([0, 64, 128])
 * // ["rgb(255, 0, 0)", "rgb(128, 128, 64)", "rgb(0, 255, 128)"]
 * 
 * // Different length arrays - stops at shortest length
 * liftedSum3([1, 2, 3, 4, 5])([10, 20])([100, 200, 300])
 * // [111, 222]
 * // Only processes while all three arrays have elements
 * 
 * // Empty array handling
 * liftedSum3([])([1, 2])([3, 4])        // []
 * liftedSum3([1, 2])([])([3, 4])        // []
 * liftedSum3([1, 2])([3, 4])([])        // []
 * 
 * // Single element arrays
 * liftedSum3([1])([2])([3])  // [6]
 * 
 * // Conditional logic - element-wise
 * const ifThenElse = <T>(condition: boolean, ifTrue: T, ifFalse: T) => 
 *   condition ? ifTrue : ifFalse
 * const liftedIfThenElse = liftTernary(ifThenElse)
 * 
 * liftedIfThenElse([true, false, true])
 *                 (["YES", "YES", "YES"])
 *                 (["NO", "NO", "NO"])
 * // ["YES", "NO", "YES"]
 * 
 * // Date creation from components
 * const makeDate = (year: number, month: number, day: number) => 
 *   new Date(year, month - 1, day)
 * const liftedMakeDate = liftTernary(makeDate)
 * 
 * liftedMakeDate([2024, 2025, 2026])([1, 6, 12])([15, 20, 25])
 * // [Date(2024-01-15), Date(2025-06-20), Date(2026-12-25)]
 * 
 * // Clamping values
 * const clamp = (min: number, max: number, value: number) => 
 *   Math.max(min, Math.min(max, value))
 * const liftedClamp = liftTernary(clamp)
 * 
 * liftedClamp([0, 10, 20])([100, 50, 30])([5, 25, 25])
 * // [5, 25, 25]
 * // Clamps: clamp(0,100,5), clamp(10,50,25), clamp(20,30,25)
 * 
 * // Object creation from parallel arrays
 * const makeUser = (id: number, name: string, role: string) => ({
 *   id,
 *   name,
 *   role
 * })
 * const liftedMakeUser = liftTernary(makeUser)
 * 
 * liftedMakeUser([1, 2, 3])
 *               (["Alice", "Bob", "Carol"])
 *               (["admin", "user", "guest"])
 * // [
 * //   { id: 1, name: "Alice", role: "admin" },
 * //   { id: 2, name: "Bob", role: "user" },
 * //   { id: 3, name: "Carol", role: "guest" }
 * // ]
 * 
 * // Range validation
 * const inRange = (value: number, min: number, max: number) => 
 *   value >= min && value <= max
 * const liftedInRange = liftTernary(inRange)
 * 
 * liftedInRange([5, 15, 25])([0, 10, 20])([10, 20, 30])
 * // [true, true, true]
 * // Checks: 5∈[0,10], 15∈[10,20], 25∈[20,30]
 * 
 * // Path construction
 * const makePath = (dir: string, subdir: string, file: string) => 
 *   `${dir}/${subdir}/${file}`
 * const liftedMakePath = liftTernary(makePath)
 * 
 * liftedMakePath(["/home", "/usr", "/var"])
 *               (["docs", "bin", "log"])
 *               (["file1.txt", "script.sh", "app.log"])
 * // ["/home/docs/file1.txt", "/usr/bin/script.sh", "/var/log/app.log"]
 * 
 * // CSS shorthand properties
 * const cssShorthand = (top: string, horizontal: string, bottom: string) =>
 *   `${top} ${horizontal} ${bottom}`
 * const liftedCssShorthand = liftTernary(cssShorthand)
 * 
 * liftedCssShorthand(["10px", "20px", "30px"])
 *                   (["15px", "25px", "35px"])
 *                   (["10px", "20px", "30px"])
 * // ["10px 15px 10px", "20px 25px 20px", "30px 35px 30px"]
 * 
 * // Statistical operations
 * const mean3 = (a: number, b: number, c: number) => (a + b + c) / 3
 * const liftedMean3 = liftTernary(mean3)
 * 
 * liftedMean3([1, 4, 7])([2, 5, 8])([3, 6, 9])
 * // [2, 5, 8]
 * // Means: (1+2+3)/3, (4+5+6)/3, (7+8+9)/3
 * 
 * // Curried usage
 * const curriedLiftedSum = liftTernary(sum3)
 * const withFirst = curriedLiftedSum([1, 2, 3])
 * const withFirstTwo = withFirst([10, 20, 30])
 * 
 * withFirstTwo([100, 200, 300])  // [111, 222, 333]
 * withFirstTwo([1000, 2000])     // [1011, 2022]
 * 
 * // Database record creation
 * const makeRecord = (table: string, id: number, data: any) => ({
 *   table,
 *   id,
 *   data,
 *   timestamp: Date.now()
 * })
 * const liftedMakeRecord = liftTernary(makeRecord)
 * 
 * liftedMakeRecord(["users", "posts", "comments"])
 *                 ([1, 2, 3])
 *                 ([{ name: "Alice" }, { title: "Hello" }, { text: "Nice!" }])
 * // Three records with matching table, id, and data
 * 
 * // Vector operations
 * const vector3D = (x: number, y: number, z: number) => ({ x, y, z })
 * const liftedVector3D = liftTernary(vector3D)
 * 
 * liftedVector3D([1, 2, 3])([4, 5, 6])([7, 8, 9])
 * // [{ x: 1, y: 4, z: 7 }, { x: 2, y: 5, z: 8 }, { x: 3, y: 6, z: 9 }]
 * 
 * // Temperature conversion with units
 * const tempWithUnit = (value: number, from: string, to: string) => {
 *   // Simplified conversion
 *   let result = value
 *   if (from === "C" && to === "F") result = value * 9/5 + 32
 *   if (from === "F" && to === "C") result = (value - 32) * 5/9
 *   return `${result.toFixed(1)}°${to}`
 * }
 * const liftedTempConvert = liftTernary(tempWithUnit)
 * 
 * liftedTempConvert([0, 100, 32])
 *                  (["C", "C", "F"])
 *                  (["F", "F", "C"])
 * // ["32.0°F", "212.0°F", "0.0°C"]
 * ```
 * @property Functor-mapping - maps ternary function over triple elements
 * @property Element-wise - combines elements at same indices, not all combinations
 * @property Length-matching - result length is minimum of three input lengths
 */
const liftTernary = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R
) => (
	fa: ReadonlyArray<A>
) => (
	fb: ReadonlyArray<B>
) => (
	fc: ReadonlyArray<C>
): Array<R> => {
	const result: Array<R> = []
	const minLength = Math.min(fa.length, fb.length, fc.length)
	
	for (let i = 0; i < minLength; i++) {
		result.push(fn(fa[i], fb[i], fc[i]))
	}
	
	return result
}

export default liftTernary