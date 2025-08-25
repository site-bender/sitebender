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
 * liftedRgba([0, 255])([0, 255])([0, 255])([0.5, 1])
 * // All 16 RGBA combinations from the given values
 *
 * // Database record creation
 * const makeRecord = (
 *   id: number,
 *   type: string,
 *   status: string,
 *   priority: number
 * ) => ({
 *   id,
 *   type,
 *   status,
 *   priority,
 *   created: new Date()
 * })
 * const liftedMakeRecord = liftA4(makeRecord)
 *
 * liftedMakeRecord([1, 2])
 *                 (["task", "bug"])
 *                 (["open", "closed"])
 *                 ([1, 2, 3])
 * // 24 different record combinations
 *
 * // Complex validation
 * const validateRange = (
 *   value: number,
 *   min: number,
 *   max: number,
 *   strict: boolean
 * ) => {
 *   if (strict) {
 *     return value > min && value < max
 *   }
 *   return value >= min && value <= max
 * }
 * const liftedValidate = liftA4(validateRange)
 *
 * liftedValidate([5, 10, 15])
 *               ([0, 8])
 *               ([12, 20])
 *               ([true, false])
 * // All validation combinations with strict/non-strict modes
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
 * liftedBuildUrl(["http", "https"])
 *               (["api.example.com", "test.example.com"])
 *               (["/v1/users", "/v2/users"])
 *               (["?active=true", "?limit=10", ""])
 * // All URL combinations
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
 * liftedMakeDateTime([2024, 2025])
 *                   ([1, 6, 12])
 *                   ([1, 15])
 *                   ([0, 12])
 * // All datetime combinations
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
 * liftedBoxModel(["10px", "20px"])
 *               (["10px", "20px"])
 *               (["10px", "20px"])
 *               (["10px", "20px"])
 * // All 16 combinations for margin/padding values
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
 * liftedMakeConfig(["dev", "staging", "prod"])
 *                 (["us-east", "eu-west"])
 *                 (["featureA", "featureB"])
 *                 ([true, false])
 * // All configuration permutations
 *
 * // Mathematical operations
 * const calculate = (a: number, b: number, c: number, d: number) =>
 *   (a + b) * (c - d)
 * const liftedCalculate = liftA4(calculate)
 *
 * liftedCalculate([1, 2])([3, 4])([5, 6])([1, 2])
 * // All calculation results
 *
 * // Empty array handling
 * liftedSum4([])([1])([2])([3])        // []
 * liftedSum4([1])([])([2])([3])        // []
 * liftedSum4([1])([2])([])([3])        // []
 * liftedSum4([1])([2])([3])([])        // []
 *
 * // Single element arrays
 * liftedSum4([1])([2])([3])([4])  // [10]
 *
 * // Curried application
 * const withFirst = liftedSum4([1, 2])
 * const withFirstTwo = withFirst([10, 20])
 * const withFirstThree = withFirstTwo([100])
 *
 * withFirstThree([1000, 2000])
 * // [1111, 2111, 1121, 2121]
 *
 * // SQL query builder
 * const buildQuery = (
 *   table: string,
 *   column: string,
 *   operator: string,
 *   value: any
 * ) => `SELECT * FROM ${table} WHERE ${column} ${operator} '${value}'`
 * const liftedQuery = liftA4(buildQuery)
 *
 * liftedQuery(["users", "posts"])
 *            (["id", "status", "created"])
 *            (["=", ">", "<"])
 *            ([1, "active", "2024-01-01"])
 * // All query combinations
 *
 * // Game state combinations
 * const gameState = (
 *   level: number,
 *   lives: number,
 *   score: number,
 *   powerup: string
 * ) => ({
 *   level,
 *   lives,
 *   score,
 *   powerup,
 *   difficulty: level * 10 - lives * 5 + score / 100
 * })
 * const liftedGameState = liftA4(gameState)
 *
 * liftedGameState([1, 2, 3])
 *                ([3, 5])
 *                ([0, 1000, 5000])
 *                (["none", "shield", "speed"])
 * // All game state combinations
 *
 * // Network request configurations
 * const makeRequest = (
 *   method: string,
 *   endpoint: string,
 *   headers: Record<string, string>,
 *   timeout: number
 * ) => ({
 *   method,
 *   url: endpoint,
 *   headers,
 *   timeout
 * })
 * const liftedRequest = liftA4(makeRequest)
 *
 * liftedRequest(["GET", "POST"])
 *              (["/api/data", "/api/users"])
 *              ([{ "Content-Type": "json" }, { "Content-Type": "xml" }])
 *              ([5000, 10000])
 * // All request configurations
 * ```
 * @property Applicative - works with applicative functors (Arrays)
 * @property Cartesian-product - creates all combinations of four inputs
 * @property Type-safe - preserves types through the transformation
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
): Array<R> => {
	const result: Array<R> = []

	for (const a of fa) {
		for (const b of fb) {
			for (const c of fc) {
				for (const d of fd) {
					result.push(fn(a, b, c, d))
				}
			}
		}
	}

	return result
}

export default liftA4
