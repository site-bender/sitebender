import type { Maybe } from "../../types/fp/maybe/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../simple/validation/isNullish/index.ts"
import just from "../just/index.ts"

/**
 * Creates a Just value with enhanced debugging output
 *
 * Like the standard just function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Maybe values in the REPL or console, while maintaining
 * the same functional behavior as the pure just constructor.
 *
 * @param value - The value to wrap in a Just
 * @returns A Just with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const result = justWithInspect(42)
 * console.log(result)  // Just(42) instead of { _tag: "Just", value: 42 }
 *
 * // Works with complex value types
 * const user = justWithInspect({ id: 1, name: "Alice" })
 * console.log(user)  // Just({"id":1,"name":"Alice"})
 *
 * // Particularly useful in REPL/debugging
 * const results = [
 *   justWithInspect(1),
 *   nothingWithInspect(),
 *   justWithInspect(2)
 * ]
 * console.log(results)  // [ Just(1), Nothing, Just(2) ]
 *
 * // Maintains all Maybe functionality
 * pipe(
 *   justWithInspect(10),
 *   map(x => x * 2),
 *   map(x => x + 5),
 *   getOrElse(() => 0)
 * )  // 25
 *
 * // Different value types display nicely
 * console.log(justWithInspect("hello"))       // Just("hello")
 * console.log(justWithInspect(true))          // Just(true)
 * console.log(justWithInspect([1, 2, 3]))     // Just([1,2,3])
 *
 * // The inspection is non-enumerable
 * const j = justWithInspect("test")
 * Object.keys(j)  // ["_tag", "value"]
 * JSON.stringify(j)  // '{"_tag":"Just","value":"test"}'
 *
 * // Comparison with standard just
 * const standard = just(42)
 * const enhanced = justWithInspect(42)
 * console.log(standard)  // { _tag: "Just", value: 42 }
 * console.log(enhanced)  // Just(42)
 * ```
 *
 * @impure
 */
const justWithInspect = <A>(value: A): Maybe<A> => {
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
		just<A>(value),
		(maybe) => `Just(${formatValue((maybe as { value: A }).value)})`,
	)
}

export default justWithInspect
