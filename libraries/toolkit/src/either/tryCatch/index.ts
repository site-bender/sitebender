import type { Either } from "../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

/**
 * Converts a throwing function into an Either-returning function
 *
 * Safely executes a function that might throw an exception, converting
 * any thrown errors into Left values and successful results into Right
 * values. This bridges the gap between exception-based error handling
 * and functional error handling with Either.
 *
 * @curried (fn) => (onError) => result
 * @param fn - Function that might throw an exception
 * @param onError - Function to transform caught errors into Left values
 * @returns Either containing the result or transformed error
 * @example
 * ```typescript
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * // Basic exception handling
 * const safeParse = tryCatch(
 *   () => JSON.parse('{"valid": "json"}'),
 *   (err: unknown) => String(err)
 * )
 * // Right({ valid: "json" })
 *
 * const safeParseInvalid = tryCatch(
 *   () => JSON.parse("invalid json"),
 *   (err: unknown) => String(err)
 * )
 * // Left("SyntaxError: Unexpected token i in JSON at position 0")
 *
 * // With error transformation
 * const parseWithContext = (json: string) => tryCatch(
 *   () => JSON.parse(json),
 *   (err: unknown) => ({
 *     error: err instanceof Error ? err.message : String(err),
 *     input: json,
 *     timestamp: Date.now()
 *   })
 * )
 *
 * parseWithContext("bad json")
 * // Left({ error: "...", input: "bad json", timestamp: ... })
 *
 * // Wrapping unsafe APIs
 * const safeReadFile = (path: string) => tryCatch(
 *   () => fs.readFileSync(path, "utf8"),
 *   (err: unknown) => `Failed to read ${path}: ${err}`
 * )
 *
 * safeReadFile("./config.json")  // Right(file contents) or Left(error)
 *
 * // Array access safety
 * const safeGet = <T>(arr: Array<T>, index: number) => tryCatch(
 *   () => {
 *     if (index < 0 || index >= arr.length) {
 *       throw new Error(`Index ${index} out of bounds`)
 *     }
 *     return arr[index]
 *   },
 *   (err: unknown) => String(err)
 * )
 *
 * safeGet([1, 2, 3], 1)   // Right(2)
 * safeGet([1, 2, 3], 10)  // Left("Error: Index 10 out of bounds")
 *
 * // Type assertions with safety
 * interface User {
 *   id: number
 *   name: string
 * }
 *
 * const assertUser = (data: unknown) => tryCatch(
 *   (): User => {
 *     if (!data || typeof data !== "object") {
 *       throw new Error("Data must be an object")
 *     }
 *     const obj = data as any
 *     if (typeof obj.id !== "number" || typeof obj.name !== "string") {
 *       throw new Error("Invalid user shape")
 *     }
 *     return obj as User
 *   },
 *   (err: unknown) => `Validation failed: ${err}`
 * )
 *
 * assertUser({ id: 1, name: "Alice" })  // Right({ id: 1, name: "Alice" })
 * assertUser({ id: "1", name: "Alice" }) // Left("Validation failed: ...")
 *
 * // DOM operations
 * const querySelector = (selector: string) => tryCatch(
 *   () => {
 *     const element = document.querySelector(selector)
 *     if (!element) {
 *       throw new Error(`Element not found: ${selector}`)
 *     }
 *     return element
 *   },
 *   () => `Invalid selector or element not found: ${selector}`
 * )
 *
 * // Regular expression matching
 * const safeMatch = (pattern: string, flags: string, text: string) => tryCatch(
 *   () => new RegExp(pattern, flags).exec(text),
 *   (err: unknown) => `Invalid regex: ${err}`
 * )
 *
 * safeMatch("\\d+", "g", "abc123def")  // Right(["123"])
 * safeMatch("[", "g", "text")          // Left("Invalid regex: ...")
 *
 * // Environment variable parsing
 * const getEnvInt = (key: string) => tryCatch(
 *   () => {
 *     const value = process.env[key]
 *     if (!value) {
 *       throw new Error(`Missing env var: ${key}`)
 *     }
 *     const num = parseInt(value, 10)
 *     if (isNaN(num)) {
 *       throw new Error(`${key} is not a number: ${value}`)
 *     }
 *     return num
 *   },
 *   (err: unknown) => String(err)
 * )
 *
 * // Partial application for specific error types
 * const tryCatchError = tryCatch(
 *   (fn: () => unknown) => fn(),
 *   (err: unknown) => err instanceof Error ? err : new Error(String(err))
 * )
 *
 * // Async variant (would need separate implementation)
 * const tryCatchAsync = async <A>(
 *   fn: () => Promise<A>,
 *   onError: (err: unknown) => string
 * ): Promise<Either<string, A>> => {
 *   try {
 *     const result = await fn()
 *     return right(result)
 *   } catch (err) {
 *     return left(onError(err))
 *   }
 * }
 *
 * // Composing with other Either operations
 * const processData = (input: string) => pipe(
 *   tryCatch(
 *     () => JSON.parse(input),
 *     () => "Invalid JSON"
 *   ),
 *   chain(data => tryCatch(
 *     () => validateData(data),
 *     () => "Validation failed"
 *   )),
 *   map(transformData)
 * )
 * ```
 *
 * @property Exception-bridge - Converts exceptions to Either values
 * @property Safe - Never throws, always returns Either
 * @property Flexible - Error handler can transform exception to any type
 */
const tryCatch = <A>(
	fn: () => A,
) =>
<E>(
	onError: (error: unknown) => E,
): Either<E, A> => {
	try {
		return right(fn())
	} catch (error) {
		return left(onError(error))
	}
}

export default tryCatch
