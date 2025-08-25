/**
 * Lifts a 5-ary function to work with applicative functors
 *
 * Takes a function of five arguments and returns a new function that works
 * with values wrapped in applicative functors (like Arrays). For Arrays, it
 * applies the function to all combinations of elements from the five arrays
 * (Cartesian product). This is useful for complex combinatorial scenarios
 * requiring five independent parameters.
 *
 * @param fn - 5-ary function to lift
 * @returns Function that works with five wrapped values
 * @example
 * ```typescript
 * // Basic arithmetic with five arrays
 * const sum5 = (a: number, b: number, c: number, d: number, e: number) =>
 *   a + b + c + d + e
 * const liftedSum5 = liftA5(sum5)
 *
 * liftedSum5([1])([10])([100])([1000])([10000])
 * // [11111]
 *
 * liftedSum5([1, 2])([10])([100])([1000])([10000])
 * // [11111, 11112]
 *
 * // Complex object creation
 * const makeEntity = (
 *   id: number,
 *   type: string,
 *   status: string,
 *   priority: number,
 *   assignee: string
 * ) => ({
 *   id,
 *   type,
 *   status,
 *   priority,
 *   assignee,
 *   created: new Date(),
 *   hash: `${id}-${type}-${status}-${priority}-${assignee}`
 * })
 * const liftedMakeEntity = liftA5(makeEntity)
 *
 * liftedMakeEntity([1, 2])
 *                 (["task", "bug"])
 *                 (["open", "closed"])
 *                 ([1, 2])
 *                 (["Alice", "Bob"])
 * // 32 different entity combinations
 *
 * // Date-time with timezone
 * const makeFullDateTime = (
 *   year: number,
 *   month: number,
 *   day: number,
 *   hour: number,
 *   minute: number
 * ) => new Date(year, month - 1, day, hour, minute)
 * const liftedDateTime = liftA5(makeFullDateTime)
 *
 * liftedDateTime([2024])
 *               ([1, 6, 12])
 *               ([1, 15, 31])
 *               ([0, 12, 18])
 *               ([0, 30])
 * // All datetime combinations with minutes
 *
 * // CSS animation shorthand
 * const animation = (
 *   name: string,
 *   duration: string,
 *   timing: string,
 *   delay: string,
 *   iteration: string
 * ) => `${name} ${duration} ${timing} ${delay} ${iteration}`
 * const liftedAnimation = liftA5(animation)
 *
 * liftedAnimation(["slide", "fade"])
 *                (["1s", "2s"])
 *                (["ease", "linear", "ease-in-out"])
 *                (["0s", "0.5s"])
 *                (["1", "infinite"])
 * // All animation combinations
 *
 * // Database connection string
 * const connectionString = (
 *   protocol: string,
 *   user: string,
 *   host: string,
 *   port: number,
 *   database: string
 * ) => `${protocol}://${user}@${host}:${port}/${database}`
 * const liftedConnection = liftA5(connectionString)
 *
 * liftedConnection(["postgresql", "mysql"])
 *                 (["admin", "user"])
 *                 (["localhost", "db.example.com"])
 *                 ([5432, 3306])
 *                 (["myapp", "testdb"])
 * // All connection string combinations
 *
 * // Complex validation with multiple rules
 * const validateField = (
 *   value: any,
 *   required: boolean,
 *   minLength: number,
 *   maxLength: number,
 *   pattern: RegExp
 * ) => {
 *   if (required && !value) return false
 *   if (typeof value === "string") {
 *     if (value.length < minLength) return false
 *     if (value.length > maxLength) return false
 *     if (!pattern.test(value)) return false
 *   }
 *   return true
 * }
 * const liftedValidate = liftA5(validateField)
 *
 * liftedValidate(["test", "a", ""])
 *               ([true, false])
 *               ([1, 3])
 *               ([10, 20])
 *               ([/^[a-z]+$/, /^[A-Z]+$/])
 * // All validation combinations
 *
 * // API request configuration
 * const apiConfig = (
 *   method: string,
 *   endpoint: string,
 *   headers: Record<string, string>,
 *   timeout: number,
 *   retries: number
 * ) => ({
 *   method,
 *   url: endpoint,
 *   headers,
 *   timeout,
 *   retries,
 *   timestamp: Date.now()
 * })
 * const liftedApiConfig = liftA5(apiConfig)
 *
 * liftedApiConfig(["GET", "POST", "PUT"])
 *                (["/api/v1", "/api/v2"])
 *                ([{ Accept: "json" }, { Accept: "xml" }])
 *                ([5000, 10000])
 *                ([0, 3])
 * // All API configuration combinations
 *
 * // Color mixing with alpha
 * const mixColors = (
 *   r1: number,
 *   g1: number,
 *   b1: number,
 *   r2: number,
 *   alpha: number
 * ) => {
 *   const r = Math.round(r1 * alpha + r2 * (1 - alpha))
 *   const g = Math.round(g1 * alpha + 0 * (1 - alpha))
 *   const b = Math.round(b1 * alpha + 0 * (1 - alpha))
 *   return `rgb(${r}, ${g}, ${b})`
 * }
 * const liftedMixColors = liftA5(mixColors)
 *
 * liftedMixColors([255, 128])
 *                ([0, 128])
 *                ([0, 255])
 *                ([0, 255])
 *                ([0.5, 0.75, 1])
 * // All color mixing combinations
 *
 * // Empty array handling
 * liftedSum5([])([1])([2])([3])([4])     // []
 * liftedSum5([1])([])([2])([3])([4])     // []
 * liftedSum5([1])([2])([])([3])([4])     // []
 * liftedSum5([1])([2])([3])([])([4])     // []
 * liftedSum5([1])([2])([3])([4])([])     // []
 *
 * // Single element arrays
 * liftedSum5([1])([2])([3])([4])([5])  // [15]
 *
 * // Curried application for configuration
 * const withDefaults = liftedApiConfig(["POST"])
 * const withEndpoint = withDefaults(["/api/data"])
 * const withHeaders = withEndpoint([{ "Content-Type": "json" }])
 * const withTimeout = withHeaders([5000])
 *
 * withTimeout([0, 1, 2, 3])
 * // Different retry configurations with fixed other params
 *
 * // Game configuration matrix
 * const gameConfig = (
 *   difficulty: string,
 *   mode: string,
 *   players: number,
 *   mapSize: string,
 *   timeLimit: number
 * ) => ({
 *   difficulty,
 *   mode,
 *   players,
 *   mapSize,
 *   timeLimit,
 *   id: `${difficulty}-${mode}-${players}p-${mapSize}-${timeLimit}min`
 * })
 * const liftedGameConfig = liftA5(gameConfig)
 *
 * liftedGameConfig(["easy", "normal", "hard"])
 *                 (["campaign", "survival", "pvp"])
 *                 ([1, 2, 4])
 *                 (["small", "medium", "large"])
 *                 ([5, 10, 15, 30])
 * // All game configuration combinations
 *
 * // Logging configuration
 * const logConfig = (
 *   level: string,
 *   format: string,
 *   destination: string,
 *   rotation: string,
 *   retention: number
 * ) => ({
 *   level,
 *   format,
 *   destination,
 *   rotation,
 *   retentionDays: retention
 * })
 * const liftedLogConfig = liftA5(logConfig)
 *
 * liftedLogConfig(["debug", "info", "warn", "error"])
 *                (["json", "text", "xml"])
 *                (["console", "file", "remote"])
 *                (["daily", "weekly", "monthly"])
 *                ([7, 30, 90])
 * // All logging configuration combinations
 * ```
 * @property Applicative - works with applicative functors (Arrays)
 * @property Cartesian-product - creates all combinations of five inputs
 * @property Type-safe - preserves types through the transformation
 */
const liftA5 = <A, B, C, D, E, R>(
	fn: (a: A, b: B, c: C, d: D, e: E) => R,
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
) =>
(
	fe: ReadonlyArray<E>,
): Array<R> => {
	const result: Array<R> = []

	for (const a of fa) {
		for (const b of fb) {
			for (const c of fc) {
				for (const d of fd) {
					for (const e of fe) {
						result.push(fn(a, b, c, d, e))
					}
				}
			}
		}
	}

	return result
}

export default liftA5
