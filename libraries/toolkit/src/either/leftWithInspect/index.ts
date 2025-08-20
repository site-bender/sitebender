import type { Either } from "../../../types/fp/either/index.ts"
import left from "../left/index.ts"
import withInspect from "../../debug/withInspect/index.ts"

/**
 * Creates a Left value with enhanced debugging output
 * 
 * Like the standard left function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Either values in the REPL or console, while maintaining
 * the same functional behavior as the pure left constructor.
 * 
 * @param value - The error value to wrap in a Left
 * @returns A Left with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const error = leftWithInspect("User not found")
 * console.log(error)  // Left("User not found") instead of { _tag: "Left", left: "User not found" }
 * 
 * // Works with complex error types
 * const validationError = leftWithInspect({
 *   field: "email",
 *   message: "Invalid format"
 * })
 * console.log(validationError)
 * // Left({"field":"email","message":"Invalid format"})
 * 
 * // Particularly useful in REPL/debugging
 * const results = [
 *   leftWithInspect("error1"),
 *   rightWithInspect(42),
 *   leftWithInspect("error2")
 * ]
 * console.log(results)
 * // [ Left("error1"), Right(42), Left("error2") ]
 * 
 * // Maintains all Either functionality
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { fold } from "../fold/index.ts"
 * 
 * pipe(
 *   leftWithInspect("error"),
 *   map((x: number) => x * 2),  // Not executed
 *   fold(
 *     err => `Failed: ${err}`,
 *     val => `Success: ${val}`
 *   )
 * )
 * // "Failed: error"
 * 
 * // Error objects display nicely
 * class ValidationError extends Error {
 *   constructor(message: string) {
 *     super(message)
 *     this.name = "ValidationError"
 *   }
 * }
 * 
 * const err = leftWithInspect(new ValidationError("Invalid input"))
 * console.log(err)  // Left(ValidationError: Invalid input)
 * 
 * // Numbers and booleans
 * console.log(leftWithInspect(404))    // Left(404)
 * console.log(leftWithInspect(false))  // Left(false)
 * console.log(leftWithInspect(null))   // Left(null)
 * 
 * // Arrays and nested structures
 * console.log(leftWithInspect(["error1", "error2"]))
 * // Left(["error1","error2"])
 * 
 * console.log(leftWithInspect({ 
 *   errors: ["Missing field", "Invalid format"],
 *   code: 400 
 * }))
 * // Left({"errors":["Missing field","Invalid format"],"code":400})
 * 
 * // The inspection is non-enumerable
 * const e = leftWithInspect("test")
 * Object.keys(e)  // ["_tag", "left"]
 * JSON.stringify(e)  // '{"_tag":"Left","left":"test"}'
 * 
 * // Useful for debugging chains
 * const process = (input: number) =>
 *   pipe(
 *     input < 0 
 *       ? leftWithInspect("Negative not allowed")
 *       : rightWithInspect(input),
 *     map(x => x * 2),
 *     map(x => x + 10)
 *   )
 * 
 * console.log(process(-5))  // Left("Negative not allowed")
 * console.log(process(5))   // Right(20)
 * ```
 * 
 * @property Enhanced-debugging - Better console.log output
 * @property Same-behavior - Functionally identical to standard left
 * @property REPL-friendly - Makes debugging Either chains easier
 */
const leftWithInspect = <E, A = never>(value: E): Either<E, A> => {
	const formatValue = (v: unknown): string => {
		if (v instanceof Error) {
			return `${v.name}: ${v.message}`
		}
		if (typeof v === "string") {
			return JSON.stringify(v)
		}
		if (v === null || v === undefined) {
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
		either => `Left(${formatValue(either.left)})`
	)
}

export default leftWithInspect