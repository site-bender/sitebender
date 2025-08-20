import type { Either } from "../../../types/fp/either/index.ts"
import right from "../right/index.ts"
import withInspect from "../../debug/withInspect/index.ts"

/**
 * Creates a Right value with enhanced debugging output
 * 
 * Like the standard right function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Either values in the REPL or console, while maintaining
 * the same functional behavior as the pure right constructor.
 * 
 * @param value - The success value to wrap in a Right
 * @returns A Right with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const result = rightWithInspect(42)
 * console.log(result)  // Right(42) instead of { _tag: "Right", right: 42 }
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
 * // Particularly useful in REPL/debugging
 * const results = [
 *   rightWithInspect(1),
 *   leftWithInspect("error"),
 *   rightWithInspect(2)
 * ]
 * console.log(results)
 * // [ Right(1), Left("error"), Right(2) ]
 * 
 * // Maintains all Either functionality
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { fold } from "../fold/index.ts"
 * 
 * pipe(
 *   rightWithInspect(10),
 *   map(x => x * 2),
 *   map(x => x + 5),
 *   fold(
 *     err => `Failed: ${err}`,
 *     val => `Success: ${val}`
 *   )
 * )
 * // "Success: 25"
 * 
 * // Different value types display nicely
 * console.log(rightWithInspect("hello"))       // Right("hello")
 * console.log(rightWithInspect(true))          // Right(true)
 * console.log(rightWithInspect(null))          // Right(null)
 * console.log(rightWithInspect(undefined))     // Right(undefined)
 * 
 * // Arrays and objects
 * console.log(rightWithInspect([1, 2, 3]))
 * // Right([1,2,3])
 * 
 * console.log(rightWithInspect({ 
 *   status: "success",
 *   data: { count: 42 }
 * }))
 * // Right({"status":"success","data":{"count":42}})
 * 
 * // The inspection is non-enumerable
 * const r = rightWithInspect("test")
 * Object.keys(r)  // ["_tag", "right"]
 * JSON.stringify(r)  // '{"_tag":"Right","right":"test"}'
 * 
 * // Useful for debugging chains
 * const calculate = (input: number) =>
 *   pipe(
 *     rightWithInspect(input),
 *     map(x => x * 2),
 *     map(x => x + 10),
 *     map(x => x / 2)
 *   )
 * 
 * console.log(calculate(5))   // Right(10)
 * console.log(calculate(10))  // Right(15)
 * 
 * // Great for validation pipelines
 * interface ValidatedUser {
 *   id: number
 *   name: string
 *   age: number
 * }
 * 
 * const validateUser = (data: unknown): Either<string, ValidatedUser> => {
 *   // ... validation logic
 *   return rightWithInspect({
 *     id: 1,
 *     name: "Bob",
 *     age: 30
 *   })
 * }
 * 
 * console.log(validateUser({}))
 * // Right({"id":1,"name":"Bob","age":30})
 * 
 * // Functions and symbols
 * const fn = () => "hello"
 * console.log(rightWithInspect(fn))  // Right([Function: fn])
 * 
 * const sym = Symbol("test")
 * console.log(rightWithInspect(sym))  // Right(Symbol(test))
 * 
 * // Dates and other built-ins
 * const date = new Date("2024-01-01")
 * console.log(rightWithInspect(date))
 * // Right("2024-01-01T00:00:00.000Z")
 * 
 * // Circular references handled safely
 * const circular: any = { value: 1 }
 * circular.self = circular
 * console.log(rightWithInspect(circular))
 * // Right([object Object]) - falls back to String() for circular
 * ```
 * 
 * @property Enhanced-debugging - Better console.log output
 * @property Same-behavior - Functionally identical to standard right
 * @property REPL-friendly - Makes debugging Either chains easier
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
		right<A, E>(value),
		either => `Right(${formatValue(either.right)})`
	)
}

export default rightWithInspect