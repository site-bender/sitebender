import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

/**
 * Converts an Either value to its string representation
 *
 * Pure function that creates a readable string representation of an Either
 * value. This is the functional alternative to using withInspect, providing
 * explicit string conversion without any object mutation. Useful for logging,
 * debugging, or displaying Either values in a human-readable format.
 *
 * @param either - The Either value to convert to string
 * @returns String representation of the Either
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 *
 * // Basic string conversion
 * show(right(42))         // "Right(42)"
 * show(left("error"))     // 'Left("error")'
 *
 * // Complex types
 * show(right({ id: 1, name: "Alice" }))
 * // 'Right({"id":1,"name":"Alice"})'
 *
 * show(left(new Error("Failed")))
 * // "Left(Error: Failed)"
 *
 * // Using in logging
 * const logEither = <E, A>(either: Either<E, A>): void => {
 *   console.log(`Result: ${show(either)}`)
 * }
 *
 * logEither(right(100))     // logs: "Result: Right(100)"
 * logEither(left("oops"))   // logs: 'Result: Left("oops")'
 *
 * // Arrays of Either values
 * const results = [
 *   right(1),
 *   left("error"),
 *   right(2)
 * ]
 *
 * console.log(results.map(show).join(", "))
 * // 'Right(1), Left("error"), Right(2)'
 *
 * // Building debug messages
 * const debug = (either: Either<string, number>) =>
 *   `Processing ${show(either)} at ${new Date().toISOString()}`
 *
 * debug(right(42))
 * // "Processing Right(42) at 2024-01-01T12:00:00.000Z"
 *
 * // Comparison with inspect approach
 * import { leftWithInspect } from "../leftWithInspect/index.ts"
 * import { rightWithInspect } from "../rightWithInspect/index.ts"
 *
 * // Pure approach (explicit)
 * const e1 = left("error")
 * console.log(show(e1))  // 'Left("error")'
 *
 * // Inspect approach (automatic)
 * const e2 = leftWithInspect("error")
 * console.log(e2)  // Left("error")
 *
 * // Using in error reports
 * const report = (results: Array<Either<Error, string>>) => {
 *   const formatted = results
 *     .map((r, i) => `  ${i + 1}. ${show(r)}`)
 *     .join("\\n")
 *
 *   return `Results:\\n${formatted}`
 * }
 *
 * report([
 *   right("success"),
 *   left(new Error("failed")),
 *   right("done")
 * ])
 * // Results:
 * //   1. Right("success")
 * //   2. Left(Error: failed)
 * //   3. Right("done")
 *
 * // Different value types
 * show(right(null))         // "Right(null)"
 * show(right(undefined))    // "Right(undefined)"
 * show(right(true))         // "Right(true)"
 * show(left(false))         // "Left(false)"
 *
 * // Functions and symbols
 * const fn = () => 42
 * show(right(fn))           // "Right([Function: fn])" or "Right([Function])"
 *
 * const sym = Symbol("test")
 * show(right(sym))          // "Right(Symbol(test))"
 *
 * // Dates
 * show(right(new Date("2024-01-01")))
 * // 'Right("2024-01-01T00:00:00.000Z")'
 *
 * // Numbers and special values
 * show(right(0))            // "Right(0)"
 * show(right(NaN))          // "Right(null)" (JSON.stringify converts NaN to null)
 * show(right(Infinity))     // "Right(null)" (JSON.stringify converts Infinity to null)
 *
 * // Circular references
 * const circular: any = { value: 1 }
 * circular.self = circular
 * show(right(circular))     // "Right([object Object])" (falls back to String())
 * ```
 *
 * @property Pure - No side effects, returns a new string
 * @property Consistent - Same format as withInspect versions
 * @property Explicit - Must be called explicitly when needed
 */
const show = <E, A>(either: Either<E, A>): string => {
	const formatValue = (v: unknown): string => {
		if (v instanceof Error) {
			return `Error: ${v.message}`
		}
		if (v instanceof Date) {
			return JSON.stringify(v)
		}
		if (typeof v === "string") {
			return JSON.stringify(v)
		}
		if (typeof v === "function") {
			return v.name ? `[Function: ${v.name}]` : "[Function]"
		}
		if (typeof v === "symbol") {
			return v.toString()
		}
		if (v === null || v === undefined) {
			return String(v)
		}
		try {
			return JSON.stringify(v)
		} catch {
			// Circular reference or other issue
			return String(v)
		}
	}

	if (isLeft(either)) {
		return `Left(${formatValue(either.left)})`
	}

	return `Right(${formatValue(either.right)})`
}

export default show
