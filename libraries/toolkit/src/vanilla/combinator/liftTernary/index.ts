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
 * // Statistical operations
 * const mean3 = (a: number, b: number, c: number) => (a + b + c) / 3
 * const liftedMean3 = liftTernary(mean3)
 *
 * liftedMean3([1, 4, 7])([2, 5, 8])([3, 6, 9])
 * // [2, 5, 8]
 * // Means: (1+2+3)/3, (4+5+6)/3, (7+8+9)/3
 *
 * // Vector operations
 * const vector3D = (x: number, y: number, z: number) => ({ x, y, z })
 * const liftedVector3D = liftTernary(vector3D)
 *
 * liftedVector3D([1, 2, 3])([4, 5, 6])([7, 8, 9])
 * // [{ x: 1, y: 4, z: 7 }, { x: 2, y: 5, z: 8 }, { x: 3, y: 6, z: 9 }]
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
 * ```
 * @pure
 * @curried
 */
const liftTernary = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
): Array<R> => {
	const minLength = Math.min(fa.length, fb.length, fc.length)
	return Array.from({ length: minLength }, (_, i) => fn(fa[i], fb[i], fc[i]))
}

export default liftTernary
