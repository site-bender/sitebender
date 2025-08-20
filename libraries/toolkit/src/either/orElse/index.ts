import type { Either } from "../../../types/fp/either/index.ts"
import isRight from "../isRight/index.ts"

/**
 * Provides an alternative Either if the original is Left
 * 
 * Returns the original Either if it's a Right, otherwise returns the
 * alternative Either. This is useful for providing fallback computations
 * or default values wrapped in Either. Unlike chainLeft, the alternative
 * can be a simple value that doesn't depend on the error.
 * 
 * @curried (alternative) => (either) => result
 * @param alternative - Either to use if the original is Left
 * @param either - The original Either
 * @returns The original if Right, otherwise the alternative
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic fallback
 * const withFallback = orElse(right(0))
 * 
 * withFallback(right(42))      // Right(42) - original
 * withFallback(left("error"))  // Right(0) - fallback
 * 
 * // Chaining alternatives
 * const primary = left("Primary failed")
 * const secondary = left("Secondary failed")
 * const tertiary = right(100)
 * 
 * pipe(
 *   primary,
 *   orElse(secondary),
 *   orElse(tertiary)
 * )
 * // Right(100)
 * 
 * // Lazy alternative computation
 * const lazyFallback = () => {
 *   console.log("Computing fallback...")
 *   return right(expensiveComputation())
 * }
 * 
 * const withLazyFallback = orElse(lazyFallback())
 * 
 * withLazyFallback(right(5))   // Right(5) - no console log
 * withLazyFallback(left("err")) // Computes and returns fallback
 * 
 * // Configuration with multiple sources
 * const getFromEnv = (): Either<string, Config> =>
 *   process.env.CONFIG
 *     ? right(JSON.parse(process.env.CONFIG))
 *     : left("No env config")
 * 
 * const getFromFile = (): Either<string, Config> =>
 *   fs.existsSync("./config.json")
 *     ? right(JSON.parse(fs.readFileSync("./config.json", "utf8")))
 *     : left("No config file")
 * 
 * const defaultConfig: Either<string, Config> = 
 *   right({ apiUrl: "http://localhost", timeout: 5000 })
 * 
 * const config = pipe(
 *   getFromEnv(),
 *   orElse(getFromFile()),
 *   orElse(defaultConfig)
 * )
 * 
 * // First successful result wins
 * const tryMultipleSources = <T>(
 *   sources: Array<() => Either<string, T>>
 * ): Either<string, T> =>
 *   sources.reduce(
 *     (result, source) => orElse(source())(result),
 *     left("No sources provided")
 *   )
 * 
 * const data = tryMultipleSources([
 *   () => fetchFromAPI(),
 *   () => fetchFromCache(),
 *   () => fetchFromLocalStorage(),
 *   () => right(defaultData)
 * ])
 * 
 * // User preference loading
 * interface UserPrefs {
 *   theme: string
 *   language: string
 * }
 * 
 * const getUserPrefs = (userId: string): Either<string, UserPrefs> =>
 *   database.getUser(userId)
 *     ? right(database.getUser(userId).prefs)
 *     : left("User not found")
 * 
 * const systemDefaults = right({
 *   theme: "light",
 *   language: "en"
 * })
 * 
 * const prefs = pipe(
 *   getUserPrefs("user123"),
 *   orElse(systemDefaults)
 * )
 * 
 * // API endpoint fallback
 * const fetchFromPrimary = (): Either<Error, Data> =>
 *   // Try primary endpoint...
 *   left(new Error("Primary unavailable"))
 * 
 * const fetchFromSecondary = (): Either<Error, Data> =>
 *   // Try secondary endpoint...
 *   right({ id: 1, value: "data" })
 * 
 * const apiData = orElse(fetchFromSecondary())(fetchFromPrimary())
 * // Right({ id: 1, value: "data" })
 * 
 * // Validation with alternatives
 * const validateStrictEmail = (email: string): Either<string, string> =>
 *   /^[^@]+@[^@]+\\.[^@]+$/.test(email)
 *     ? right(email)
 *     : left("Invalid email")
 * 
 * const validateLooseEmail = (email: string): Either<string, string> =>
 *   email.includes("@")
 *     ? right(email)
 *     : left("No @ symbol")
 * 
 * const validateEmail = (email: string) =>
 *   pipe(
 *     validateStrictEmail(email),
 *     orElse(validateLooseEmail(email))
 *   )
 * 
 * // Different error types in alternatives
 * const parseAsNumber = (str: string): Either<string, number> => {
 *   const num = parseFloat(str)
 *   return isNaN(num) ? left("Not a number") : right(num)
 * }
 * 
 * const parseAsBoolean = (str: string): Either<string, number> =>
 *   str === "true" ? right(1) :
 *   str === "false" ? right(0) :
 *   left("Not a boolean")
 * 
 * const parseValue = (str: string) =>
 *   pipe(
 *     parseAsNumber(str),
 *     orElse(parseAsBoolean(str)),
 *     orElse(right(0))  // Final fallback
 *   )
 * 
 * parseValue("42")    // Right(42)
 * parseValue("true")  // Right(1)
 * parseValue("xyz")   // Right(0)
 * ```
 * 
 * @property Alternative - Provides fallback for Left values
 * @property Short-circuits - Returns first Right encountered
 * @property Composable - Can chain multiple alternatives
 */
const orElse = <E, F, A>(
	alternative: Either<F, A> | (() => Either<F, A>)
) => (
	either: Either<E, A>
): Either<F, A> => {
	if (isRight(either)) {
		return either
	}
	
	return typeof alternative === "function"
		? alternative()
		: alternative
}

export default orElse