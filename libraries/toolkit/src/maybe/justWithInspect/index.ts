import type { Maybe } from "../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import withInspect from "../../debug/withInspect/index.ts"

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
 * const user = justWithInspect({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * })
 * console.log(user)
 * // Just({"id":1,"name":"Alice","email":"alice@example.com"})
 * 
 * // Particularly useful in REPL/debugging
 * const results = [
 *   justWithInspect(1),
 *   nothingWithInspect(),
 *   justWithInspect(2)
 * ]
 * console.log(results)
 * // [ Just(1), Nothing, Just(2) ]
 * 
 * // Maintains all Maybe functionality
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { getOrElse } from "../getOrElse/index.ts"
 * 
 * pipe(
 *   justWithInspect(10),
 *   map(x => x * 2),
 *   map(x => x + 5),
 *   getOrElse(() => 0)
 * )
 * // 25
 * 
 * // Different value types display nicely
 * console.log(justWithInspect("hello"))       // Just("hello")
 * console.log(justWithInspect(true))          // Just(true)
 * console.log(justWithInspect(null))          // Just(null)
 * console.log(justWithInspect(undefined))     // Just(undefined)
 * 
 * // Arrays and objects
 * console.log(justWithInspect([1, 2, 3]))
 * // Just([1,2,3])
 * 
 * console.log(justWithInspect({ 
 *   status: "success",
 *   data: { count: 42 }
 * }))
 * // Just({"status":"success","data":{"count":42}})
 * 
 * // The inspection is non-enumerable
 * const j = justWithInspect("test")
 * Object.keys(j)  // ["_tag", "value"]
 * JSON.stringify(j)  // '{"_tag":"Just","value":"test"}'
 * 
 * // Useful for debugging chains
 * const calculate = (input: number) =>
 *   pipe(
 *     justWithInspect(input),
 *     map(x => x * 2),
 *     map(x => x + 10),
 *     map(x => x / 2)
 *   )
 * 
 * console.log(calculate(5))   // Just(10)
 * console.log(calculate(10))  // Just(15)
 * 
 * // Great for validation pipelines
 * interface ValidatedUser {
 *   id: number
 *   name: string
 *   age: number
 * }
 * 
 * const validateUser = (data: unknown): Maybe<ValidatedUser> => {
 *   // ... validation logic
 *   return justWithInspect({
 *     id: 1,
 *     name: "Bob",
 *     age: 30
 *   })
 * }
 * 
 * console.log(validateUser({}))
 * // Just({"id":1,"name":"Bob","age":30})
 * 
 * // Functions and symbols
 * const fn = () => "hello"
 * console.log(justWithInspect(fn))  // Just([Function: fn])
 * 
 * const sym = Symbol("test")
 * console.log(justWithInspect(sym))  // Just(Symbol(test))
 * 
 * // Dates and other built-ins
 * const date = new Date("2024-01-01")
 * console.log(justWithInspect(date))
 * // Just("2024-01-01T00:00:00.000Z")
 * 
 * // Circular references handled safely
 * const circular: any = { value: 1 }
 * circular.self = circular
 * console.log(justWithInspect(circular))
 * // Just([object Object]) - falls back to String() for circular
 * 
 * // Comparison with standard just
 * import { just } from "../just/index.ts"
 * 
 * const standard = just(42)
 * const enhanced = justWithInspect(42)
 * 
 * console.log(standard)  // { _tag: "Just", value: 42 }
 * console.log(enhanced)  // Just(42)
 * 
 * // Both work identically in operations
 * map(x => x * 2)(standard)  // Just(84)
 * map(x => x * 2)(enhanced)  // Just(84)
 * ```
 * 
 * @property Enhanced-debugging - Better console.log output
 * @property Same-behavior - Functionally identical to standard just
 * @property REPL-friendly - Makes debugging Maybe chains easier
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
	
	return withInspect(
		just<A>(value),
		maybe => `Just(${formatValue(maybe.value)})`
	)
}

export default justWithInspect