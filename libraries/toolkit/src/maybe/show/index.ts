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
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic string conversion
 * show(just(42))         // "Just(42)"
 * show(nothing())        // "Nothing"
 * show(just("hello"))    // 'Just("hello")'
 *
 * // Complex types
 * show(just({ id: 1, name: "Alice" }))
 * // 'Just({"id":1,"name":"Alice"})'
 *
 * show(just([1, 2, 3]))
 * // "Just([1,2,3])"
 *
 * // Using in logging
 * const logMaybe = <A>(maybe: Maybe<A>): void => {
 *   console.log(`Result: ${show(maybe)}`)
 * }
 *
 * logMaybe(just(100))     // logs: "Result: Just(100)"
 * logMaybe(nothing())     // logs: "Result: Nothing"
 *
 * // Arrays of Maybe values
 * const results = [
 *   just(1),
 *   nothing(),
 *   just(2),
 *   nothing(),
 *   just(3)
 * ]
 *
 * console.log(results.map(show).join(", "))
 * // "Just(1), Nothing, Just(2), Nothing, Just(3)"
 *
 * // Building debug messages
 * const debug = (maybe: Maybe<number>) =>
 *   `Processing ${show(maybe)} at ${new Date().toISOString()}`
 *
 * debug(just(42))
 * // "Processing Just(42) at 2024-01-01T12:00:00.000Z"
 *
 * debug(nothing())
 * // "Processing Nothing at 2024-01-01T12:00:00.000Z"
 *
 * // Comparison with inspect approach
 * import { justWithInspect } from "../justWithInspect/index.ts"
 * import { nothingWithInspect } from "../nothingWithInspect/index.ts"
 *
 * // Pure approach (explicit)
 * const m1 = just("value")
 * console.log(show(m1))  // 'Just("value")'
 *
 * // Inspect approach (automatic)
 * const m2 = justWithInspect("value")
 * console.log(m2)  // Just("value")
 *
 * // Using in error reports
 * const report = (results: Array<Maybe<string>>) => {
 *   const formatted = results
 *     .map((r, i) => `  ${i + 1}. ${show(r)}`)
 *     .join("\\n")
 *
 *   return `Results:\\n${formatted}`
 * }
 *
 * report([
 *   just("success"),
 *   nothing(),
 *   just("done")
 * ])
 * // Results:
 * //   1. Just("success")
 * //   2. Nothing
 * //   3. Just("done")
 *
 * // Different value types
 * show(just(null))         // "Just(null)"
 * show(just(undefined))    // "Just(undefined)"
 * show(just(true))         // "Just(true)"
 * show(just(false))        // "Just(false)"
 *
 * // Functions and symbols
 * const fn = () => 42
 * show(just(fn))           // "Just([Function: fn])" or "Just([Function])"
 *
 * const sym = Symbol("test")
 * show(just(sym))          // "Just(Symbol(test))"
 *
 * // Dates
 * show(just(new Date("2024-01-01")))
 * // 'Just("2024-01-01T00:00:00.000Z")'
 *
 * // Numbers and special values
 * show(just(0))            // "Just(0)"
 * show(just(NaN))          // "Just(null)" (JSON.stringify converts NaN to null)
 * show(just(Infinity))     // "Just(null)" (JSON.stringify converts Infinity to null)
 *
 * // Errors
 * show(just(new Error("Failed")))
 * // "Just(Error: Failed)"
 *
 * // Circular references
 * const circular: any = { value: 1 }
 * circular.self = circular
 * show(just(circular))     // "Just([object Object])" (falls back to String())
 *
 * // Using in test assertions
 * const assertEqual = <A>(
 *   actual: Maybe<A>,
 *   expected: Maybe<A>,
 *   message?: string
 * ): void => {
 *   const actualStr = show(actual)
 *   const expectedStr = show(expected)
 *
 *   if (actualStr !== expectedStr) {
 *     throw new Error(
 *       message || `Expected ${expectedStr}, got ${actualStr}`
 *     )
 *   }
 * }
 *
 * assertEqual(just(42), just(42))  // passes
 * assertEqual(just(42), nothing())  // throws: Expected Nothing, got Just(42)
 *
 * // Filtering and showing
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const showFiltered = (n: number): string =>
 *   pipe(
 *     just(n),
 *     filter(x => x > 0),
 *     show
 *   )
 *
 * showFiltered(5)   // "Just(5)"
 * showFiltered(-5)  // "Nothing"
 *
 * // Tracing pipeline transformations
 * import { map } from "../map/index.ts"
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
 *
 * // Serializing for storage
 * const serialize = <A>(maybe: Maybe<A>): string => {
 *   return JSON.stringify({
 *     type: "Maybe",
 *     representation: show(maybe),
 *     isNothing: isNothing(maybe),
 *     value: isNothing(maybe) ? null : maybe.value
 *   })
 * }
 *
 * serialize(just(42))
 * // '{"type":"Maybe","representation":"Just(42)","isNothing":false,"value":42}'
 *
 * serialize(nothing())
 * // '{"type":"Maybe","representation":"Nothing","isNothing":true,"value":null}'
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
