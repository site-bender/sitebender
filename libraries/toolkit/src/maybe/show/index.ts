import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Converts a Maybe value to its string representation
 *
 * Pure function that creates a readable string representation of a Maybe
 * value. This is the functional alternative to using withInspect, providing
 * explicit string conversion without any object mutation. Useful for logging,
 * debugging, or displaying Maybe values in a human-readable format.
 *
 * @param maybe - The Maybe value to convert to string
 * @returns String representation of the Maybe
 * @example
 * ```typescript
 * // Basic usage
 * show(just(42))         // "Just(42)"
 * show(nothing())        // "Nothing"
 * show(just("hello"))    // 'Just("hello")'
 *
 * // Complex types
 * show(just({ id: 1, name: "Alice" }))  // 'Just({"id":1,"name":"Alice"})'
 * show(just([1, 2, 3]))                  // "Just([1,2,3])"
 *
 * // Special values
 * show(just(null))         // "Just(null)"
 * show(just(undefined))    // "Just(undefined)"
 * show(just(new Date("2024-01-01")))  // 'Just("2024-01-01T00:00:00.000Z")'
 *
 * // Using in pipelines
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const trace = <A>(label: string) => (maybe: Maybe<A>): Maybe<A> => {
 *   console.log(`${label}: ${show(maybe)}`)
 *   return maybe
 * }
 *
 * pipe(
 *   just(10),
 *   trace("Initial"),         // logs: "Initial: Just(10)"
 *   map(x => x * 2),
 *   trace("After double"),     // logs: "After double: Just(20)"
 *   filter(x => x > 50),
 *   trace("After filter")      // logs: "After filter: Nothing"
 * )
 * ```
 *
 * @pure
 */
const show = <A>(maybe: Maybe<A>): string => {
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

	if (isNothing(maybe)) {
		return "Nothing"
	}

	return `Just(${formatValue(maybe.value)})`
}

export default show
