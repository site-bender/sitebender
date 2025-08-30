import type { Either } from "../../types/fp/either/index.ts"

import withInspect from "../../debug/withInspect/index.ts"
import left from "../left/index.ts"
import isNullish from "../../simple/validation/isNullish/index.ts"

/**
 * Creates a Left value with enhanced debugging output
 *
 * Like the standard left function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Either values in the REPL or console, while maintaining
 * the same functional behavior as the pure left constructor.
 *
 * @impure
 * @param value - The error value to wrap in a Left
 * @returns A Left with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const error = leftWithInspect("User not found")
 * console.log(error)  // Left("User not found")
 *
 * // Works with complex error types
 * const validationError = leftWithInspect({
 *   field: "email",
 *   message: "Invalid format"
 * })
 * console.log(validationError)
 * // Left({"field":"email","message":"Invalid format"})
 *
 * // Maintains all Either functionality
 * pipe(
 *   leftWithInspect("error"),
 *   map((x: number) => x * 2),  // Not executed
 *   fold(
 *     err => `Failed: ${err}`,
 *     val => `Success: ${val}`
 *   )
 * ) // "Failed: error"
 *
 * // Error objects display nicely
 * const err = leftWithInspect(new ValidationError("Invalid input"))
 * console.log(err)  // Left(ValidationError: Invalid input)
 *
 * // The inspection is non-enumerable
 * const e = leftWithInspect("test")
 * Object.keys(e)  // ["_tag", "left"]
 * JSON.stringify(e)  // '{"_tag":"Left","left":"test"}'
 * ```
 *
 */
const leftWithInspect = <E, A = never>(value: E): Either<E, A> => {
	const formatValue = (v: unknown): string => {
		if (v instanceof Error) {
			return `${v.name}: ${v.message}`
		}
		if (typeof v === "string") {
			return JSON.stringify(v)
		}
		if (isNullish(v)) {
			return String(v)
		}
		try {
			return JSON.stringify(v)
		} catch {
			return String(v)
		}
	}

	return withInspect(
		left<E, A>(value),
		(either) => `Left(${formatValue(either.left)})`,
	)
}

export default leftWithInspect
