import type { Either } from "../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

/**
 * Extracts the Right value or returns a default value
 *
 * Safely extracts the success value from an Either, providing a fallback
 * value for the error case. This is one of the most common ways to escape
 * from the Either context when you have a reasonable default for errors.
 * The default value can be a constant or computed from the error.
 *
 * @param defaultValue - Value or function to provide when Either is Left
 * @param either - The Either to extract from
 * @returns The Right value if present, otherwise the default
 * @example
 * ```typescript
 * // Basic extraction with constant default
 * const withDefault = getOrElse(0)
 * withDefault(right(42))      // 42
 * withDefault(left("error"))  // 0
 *
 * // Using a function to compute default from error
 * const withComputedDefault = getOrElse(
 *   (err: string) => err.length
 * )
 * withComputedDefault(right(100))     // 100
 * withComputedDefault(left("error"))  // 5 (length of "error")
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
 * import pipe from "../../simple/combinator/pipe"
 * pipe(
 *   loadConfig(),
 *   getOrElse(defaultConfig)
 * )  // Uses defaultConfig if loading failed
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
 * parseIntWithDefault("42", 0)   // 42
 * parseIntWithDefault("abc", 0)  // 0
 * ```
 *
 * @pure
 * @curried
 * @safe
 */
const getOrElse = <A>(
	defaultValue: A | ((e: unknown) => A),
) =>
<E>(
	either: Either<E, A>,
): A => {
	if (isRight(either)) {
		return either.right
	}

	return typeof defaultValue === "function"
		? (defaultValue as (e: E) => A)(either.left)
		: defaultValue
}

export default getOrElse
