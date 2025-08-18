/**
 * Like construct but with specified arity
 * Limits constructor arguments to exactly n parameters
 *
 * @param n - Number of arguments to accept
 * @param Constructor - Constructor function to wrap
 * @returns Function that creates instances with n arguments
 * @example
 * ```typescript
 * // Date constructor is variadic, limit it to specific arities
 * const createDateFromString = constructN(1, Date)
 * const createDateFromParts = constructN(3, Date)
 *
 * createDateFromString("2024-01-01") // new Date("2024-01-01")
 * createDateFromParts(2024, 0, 1) // new Date(2024, 0, 1)
 *
 * // Extra arguments are ignored
 * createDateFromParts(2024, 0, 1, 12, 30, 45) // new Date(2024, 0, 1)
 *
 * // Useful with array methods that pass extra arguments
 * class Point {
 *   constructor(public x: number, public y: number = 0, public z: number = 0) {}
 *   toString() {
 *     return `(${this.x}, ${this.y}, ${this.z})`
 *   }
 * }
 *
 * // map passes (value, index, array), but we only want value
 * const createPoint1D = constructN(1, Point)
 * const values = [1, 2, 3]
 * const points = values.map(createPoint1D)
 * // [Point(1, 0, 0), Point(2, 0, 0), Point(3, 0, 0)]
 *
 * // Create 2D points from pairs
 * const createPoint2D = constructN(2, Point)
 * const pairs = [[1, 2], [3, 4], [5, 6]]
 * const points2D = pairs.map(p => apply(createPoint2D, p))
 * // [Point(1, 2, 0), Point(3, 4, 0), Point(5, 6, 0)]
 *
 * // Variadic constructors with fixed arity
 * class Collection {
 *   items: ReadonlyArray<unknown>
 *   constructor(...items: ReadonlyArray<unknown>) {
 *     this.items = items
 *   }
 * }
 *
 * const createPair = constructN(2, Collection)
 * const createTriple = constructN(3, Collection)
 *
 * createPair("a", "b").items // ["a", "b"]
 * createTriple(1, 2, 3, 4).items // [1, 2, 3] (4 is ignored)
 * ```
 *
 * Note: This is particularly useful when constructors accept optional
 * parameters or when using with array methods that pass extra arguments.
 */
// deno-lint-ignore no-explicit-any
const constructN = <R>(n: number, Constructor: new (...args: any[]) => R) => {
	// deno-lint-ignore no-explicit-any
	const wrappers: { [key: number]: (...args: any[]) => R } = {
		0: () => new Constructor(),
		// deno-lint-ignore no-explicit-any
		1: (a: any) => new Constructor(a),
		// deno-lint-ignore no-explicit-any
		2: (a: any, b: any) => new Constructor(a, b),
		// deno-lint-ignore no-explicit-any
		3: (a: any, b: any, c: any) => new Constructor(a, b, c),
		// deno-lint-ignore no-explicit-any
		4: (a: any, b: any, c: any, d: any) => new Constructor(a, b, c, d),
		// deno-lint-ignore no-explicit-any
		5: (a: any, b: any, c: any, d: any, e: any) =>
			new Constructor(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	// deno-lint-ignore no-explicit-any
	return wrappers[n] ||
		((...args: any[]) => new Constructor(...args.slice(0, n)))
}

export default constructN
