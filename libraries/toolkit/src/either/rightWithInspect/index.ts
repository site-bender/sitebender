import type { Either } from "../../types/fp/either/index.ts"

import withInspect from "../../debug/withInspect/index.ts"
import isNullish from "../../simple/validation/isNullish/index.ts"
import right from "../right/index.ts"

/**
 * Creates a Right value with enhanced debugging output
 *
 * Like the standard right function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Either values in the REPL or console, while maintaining
 * the same functional behavior as the pure right constructor.
 *
 * @impure
 * @param value - The success value to wrap in a Right
 * @returns A Right with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const result = rightWithInspect(42)
 * console.log(result)  // Right(42)
 *
 * // Works with complex success types
 * const user = rightWithInspect({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * })
 * console.log(user)
 * // Right({"id":1,"name":"Alice","email":"alice@example.com"})
 *
 * // Maintains all Either functionality
 * pipe(
 *   rightWithInspect(10),
 *   map(x => x * 2),
 *   map(x => x + 5),
 *   fold(
 *     err => `Failed: ${err}`,
 *     val => `Success: ${val}`
 *   )
 * ) // "Success: 25"
 *
 * // Different value types display nicely
 * console.log(rightWithInspect("hello"))  // Right("hello")
 * console.log(rightWithInspect(true))     // Right(true)
 * console.log(rightWithInspect([1, 2, 3])) // Right([1,2,3])
 *
 * // The inspection is non-enumerable
 * const r = rightWithInspect("test")
 * Object.keys(r)     // ["_tag", "right"]
 * JSON.stringify(r)  // '{"_tag":"Right","right":"test"}'
 * ```
 */
const rightWithInspect = <A, E = never>(value: A): Either<E, A> => {
	const formatValue = (v: unknown): string => {
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
		if (isNullish(v)) {
			return String(v)
		}
		try {
			return JSON.stringify(v)
		} catch {
			// Circular reference or other issue
			return String(v)
		}
	}

	return withInspect(
		right<A, E>(value),
		(either) => `Right(${formatValue(either.right)})`,
	)
}

export default rightWithInspect
