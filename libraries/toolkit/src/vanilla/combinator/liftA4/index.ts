/**
 * Lifts a quaternary function to work with applicative functors
 *
 * Takes a function of four arguments and returns a new function that works
 * with values wrapped in applicative functors (like Arrays). For Arrays, it
 * applies the function to all combinations of elements from the four arrays
 * (Cartesian product). This is a specialized version of lift for exactly
 * four arguments, useful for complex combinatorial operations.
 *
 * @param fn - Quaternary function to lift
 * @returns Function that works with four wrapped values
 * @example
 * ```typescript
 * // Basic arithmetic with four arrays
 * const sum4 = (a: number, b: number, c: number, d: number) => a + b + c + d
 * const liftedSum4 = liftA4(sum4)
 *
 * liftedSum4([1, 2])([10])([100])([1000])
 * // [1111, 2111]
 * // Applies: 1+10+100+1000, 2+10+100+1000
 *
 * // RGBA color creation
 * const rgba = (r: number, g: number, b: number, a: number) =>
 *   `rgba(${r}, ${g}, ${b}, ${a})`
 * const liftedRgba = liftA4(rgba)
 *
 * liftedRgba([0, 255])([128])([64])([0.5, 1])
 * // ["rgba(0, 128, 64, 0.5)", "rgba(0, 128, 64, 1)",
 * //  "rgba(255, 128, 64, 0.5)", "rgba(255, 128, 64, 1)"]
 *
 * // URL construction
 * const buildUrl = (
 *   protocol: string,
 *   domain: string,
 *   path: string,
 *   query: string
 * ) => `${protocol}://${domain}${path}${query}`
 * const liftedBuildUrl = liftA4(buildUrl)
 *
 * liftedBuildUrl(["https"])
 *               (["api.example.com"])
 *               (["/v1/users", "/v2/users"])
 *               (["?active=true", ""])
 * // ["https://api.example.com/v1/users?active=true",
 * //  "https://api.example.com/v1/users",
 * //  "https://api.example.com/v2/users?active=true",
 * //  "https://api.example.com/v2/users"]
 *
 * // Date-time construction
 * const makeDateTime = (
 *   year: number,
 *   month: number,
 *   day: number,
 *   hour: number
 * ) => new Date(year, month - 1, day, hour)
 * const liftedMakeDateTime = liftA4(makeDateTime)
 *
 * liftedMakeDateTime([2024])([1])([15, 30])([9, 17])
 * // [Date(2024-01-15 09:00), Date(2024-01-15 17:00),
 * //  Date(2024-01-30 09:00), Date(2024-01-30 17:00)]
 *
 * // CSS box model
 * const boxModel = (
 *   top: string,
 *   right: string,
 *   bottom: string,
 *   left: string
 * ) => `${top} ${right} ${bottom} ${left}`
 * const liftedBoxModel = liftA4(boxModel)
 *
 * liftedBoxModel(["10px"])
 *               (["10px", "20px"])
 *               (["10px"])
 *               (["10px", "20px"])
 * // ["10px 10px 10px 10px", "10px 10px 10px 20px",
 * //  "10px 20px 10px 10px", "10px 20px 10px 20px"]
 *
 * // Configuration combinations
 * const makeConfig = (
 *   env: string,
 *   region: string,
 *   feature: string,
 *   debug: boolean
 * ) => ({
 *   environment: env,
 *   region,
 *   featureFlag: feature,
 *   debugMode: debug
 * })
 * const liftedMakeConfig = liftA4(makeConfig)
 *
 * liftedMakeConfig(["dev"])
 *                 (["us-east"])
 *                 (["featureA", "featureB"])
 *                 ([true, false])
 * // All configuration permutations
 *
 * // Mathematical operations
 * const calculate = (a: number, b: number, c: number, d: number) =>
 *   (a + b) * (c - d)
 * const liftedCalculate = liftA4(calculate)
 *
 * liftedCalculate([1])([3])([5, 6])([1, 2])
 * // All calculation results: [16, 8, 20, 12]
 *
 * // Empty array handling
 * liftedSum4([])([1])([2])([3])        // []
 * liftedSum4([1])([])([2])([3])        // []
 * liftedSum4([1])([2])([])([3])        // []
 * liftedSum4([1])([2])([3])([])        // []
 *
 * // Single element arrays
 * liftedSum4([1])([2])([3])([4])  // [10]
 * ```
 * @pure
 * @curried
 */
const liftA4 = <A, B, C, D, R>(
	fn: (a: A, b: B, c: C, d: D) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
) =>
(
	fd: ReadonlyArray<D>,
): Array<R> =>
	fa.flatMap((a) =>
		fb.flatMap((b) => fc.flatMap((c) => fd.map((d) => fn(a, b, c, d))))
	)

export default liftA4
