/**
 * Like construct but with specified arity
 * Limits constructor arguments to exactly n parameters
 *
 * @param n - Number of arguments to accept
 * @param Constructor - Constructor function to wrap
 * @returns Function that creates instances with n arguments
 * @pure
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
 * const pairs = [[1, 2], [3, 4]]
 * const points2D = pairs.map(p => createPoint2D(...p))
 * // [Point(1, 2, 0), Point(3, 4, 0)]
 * ```
 */

const constructN = <R>(
	n: number,
	Constructor: new (...args: unknown[]) => R,
) => {
	const wrappers: { [key: number]: (...args: unknown[]) => R } = {
		0: () => new Constructor(),
		1: (a: unknown) => new Constructor(a),
		2: (a: unknown, b: unknown) => new Constructor(a, b),
		3: (a: unknown, b: unknown, c: unknown) => new Constructor(a, b, c),
		4: (a: unknown, b: unknown, c: unknown, d: unknown) =>
			new Constructor(a, b, c, d),
		5: (a: unknown, b: unknown, c: unknown, d: unknown, e: unknown) =>
			new Constructor(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	return wrappers[n] ||
		((...args: unknown[]) => new Constructor(...args.slice(0, n)))
}

export default constructN
