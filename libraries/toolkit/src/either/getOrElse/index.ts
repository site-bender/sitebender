import type { Either } from "../../../types/fp/either/index.ts"
import isRight from "../isRight/index.ts"

/**
 * Extracts the Right value or returns a default value
 * 
 * Safely extracts the success value from an Either, providing a fallback
 * value for the error case. This is one of the most common ways to escape
 * from the Either context when you have a reasonable default for errors.
 * The default value can be a constant or computed from the error.
 * 
 * @curried (defaultValue) => (either) => result
 * @param defaultValue - Value or function to provide when Either is Left
 * @param either - The Either to extract from
 * @returns The Right value if present, otherwise the default
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic extraction with constant default
 * const withDefault = getOrElse(0)
 * 
 * withDefault(right(42))      // 42
 * withDefault(left("error"))  // 0
 * 
 * // Using a function to compute default from error
 * const withComputedDefault = getOrElse(
 *   (err: string) => err.length
 * )
 * 
 * withComputedDefault(right(100))        // 100
 * withComputedDefault(left("error"))     // 5 (length of "error")
 * 
 * // Configuration with fallback
 * interface Config {
 *   apiUrl: string
 *   timeout: number
 * }
 * 
 * const defaultConfig: Config = {
 *   apiUrl: "http://localhost:3000",
 *   timeout: 5000
 * }
 * 
 * const loadConfig = (): Either<string, Config> => {
 *   // Attempt to load config...
 *   return left("Config file not found")
 * }
 * 
 * const config = pipe(
 *   loadConfig(),
 *   getOrElse(defaultConfig)
 * )
 * // Uses defaultConfig since loading failed
 * 
 * // User preferences with defaults
 * interface UserPrefs {
 *   theme: "light" | "dark"
 *   language: string
 * }
 * 
 * const getUserPrefs = (userId: string): Either<string, UserPrefs> =>
 *   userId === "123" 
 *     ? right({ theme: "dark", language: "en" })
 *     : left("User not found")
 * 
 * const prefs = pipe(
 *   getUserPrefs("456"),
 *   getOrElse({ theme: "light", language: "en" })
 * )
 * // { theme: "light", language: "en" }
 * 
 * // Parsing with fallback
 * const parseIntWithDefault = (str: string, defaultVal: number) => {
 *   const parsed = parseInt(str, 10)
 *   return pipe(
 *     isNaN(parsed) ? left("Not a number") : right(parsed),
 *     getOrElse(defaultVal)
 *   )
 * }
 * 
 * parseIntWithDefault("42", 0)     // 42
 * parseIntWithDefault("abc", 0)    // 0
 * parseIntWithDefault("", 100)     // 100
 * 
 * // Optional chaining alternative
 * const getNestedValue = (obj: any): Either<string, number> => {
 *   try {
 *     const value = obj?.data?.items?.[0]?.count
 *     return value !== undefined 
 *       ? right(value)
 *       : left("Value not found")
 *   } catch {
 *     return left("Access error")
 *   }
 * }
 * 
 * const count = pipe(
 *   getNestedValue(someObject),
 *   getOrElse(0)
 * )
 * 
 * // Database query with empty result fallback
 * const findProduct = (id: string): Either<string, Product> =>
 *   database.products[id]
 *     ? right(database.products[id])
 *     : left(`Product ${id} not found`)
 * 
 * const product = pipe(
 *   findProduct("xyz"),
 *   getOrElse({
 *     id: "default",
 *     name: "Unknown Product",
 *     price: 0
 *   })
 * )
 * 
 * // Error logging with default
 * const withLogging = getOrElse((err: Error) => {
 *   console.error("Operation failed:", err.message)
 *   return null  // Return null as default
 * })
 * 
 * // Computation with fallback strategy
 * const calculate = (input: string): Either<string, number> => {
 *   const num = parseFloat(input)
 *   if (isNaN(num)) return left("Invalid number")
 *   if (num < 0) return left("Negative not allowed")
 *   return right(Math.sqrt(num))
 * }
 * 
 * const results = ["16", "-4", "abc", "9"].map(input =>
 *   pipe(
 *     calculate(input),
 *     getOrElse(0)
 *   )
 * )
 * // [4, 0, 0, 3]
 * 
 * // Lazy evaluation of default
 * const expensiveDefault = () => {
 *   console.log("Computing expensive default...")
 *   // Expensive computation
 *   return computeExpensiveValue()
 * }
 * 
 * const value = pipe(
 *   right(42),
 *   getOrElse(expensiveDefault)  // expensiveDefault not called
 * )
 * // 42 (no console log)
 * 
 * // Type narrowing
 * const processResult = (either: Either<string, number>) => {
 *   const value = getOrElse(0)(either)
 *   // value is guaranteed to be number here
 *   return value * 2
 * }
 * ```
 * 
 * @property Safe - Never throws, always returns a value
 * @property Flexible - Default can be constant or computed from error
 * @property Terminal - Exits the Either context
 */
const getOrElse = <A>(
	defaultValue: A | ((e: unknown) => A)
) => <E>(
	either: Either<E, A>
): A => {
	if (isRight(either)) {
		return either.right
	}
	
	return typeof defaultValue === "function"
		? (defaultValue as (e: E) => A)(either.left)
		: defaultValue
}

export default getOrElse