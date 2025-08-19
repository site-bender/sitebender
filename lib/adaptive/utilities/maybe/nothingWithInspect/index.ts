import type { Maybe } from "../../../types/fp/maybe/index.ts"
import nothing from "../nothing/index.ts"
import withInspect from "../../debug/withInspect/index.ts"

/**
 * Creates a Nothing value with enhanced debugging output
 * 
 * Like the standard nothing function, but attaches a custom inspection method
 * for better console.log output. This provides superior developer experience
 * when debugging Maybe values in the REPL or console, while maintaining
 * the same functional behavior as the pure nothing constructor.
 * 
 * @returns A Nothing with custom inspect method for nice console output
 * @example
 * ```typescript
 * // Enhanced console output
 * const result = nothingWithInspect()
 * console.log(result)  // Nothing instead of { _tag: "Nothing" }
 * 
 * // Particularly useful in REPL/debugging
 * const results = [
 *   justWithInspect(1),
 *   nothingWithInspect(),
 *   justWithInspect(2),
 *   nothingWithInspect()
 * ]
 * console.log(results)
 * // [ Just(1), Nothing, Just(2), Nothing ]
 * 
 * // Maintains all Maybe functionality
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { getOrElse } from "../getOrElse/index.ts"
 * 
 * pipe(
 *   nothingWithInspect(),
 *   map((x: number) => x * 2),
 *   map((x: number) => x + 5),
 *   getOrElse(() => 0)
 * )
 * // 0 (default value)
 * 
 * // The inspection is non-enumerable
 * const n = nothingWithInspect()
 * Object.keys(n)  // ["_tag"]
 * JSON.stringify(n)  // '{"_tag":"Nothing"}'
 * 
 * // Useful for debugging chains
 * const safeDivide = (a: number) => (b: number) =>
 *   b === 0 
 *     ? nothingWithInspect()
 *     : justWithInspect(a / b)
 * 
 * console.log(safeDivide(10)(2))   // Just(5)
 * console.log(safeDivide(10)(0))   // Nothing
 * 
 * // Great for validation pipelines with clear output
 * interface ValidationResult {
 *   isValid: boolean
 *   value?: number
 * }
 * 
 * const validate = (input: ValidationResult): Maybe<number> =>
 *   input.isValid && input.value !== undefined
 *     ? justWithInspect(input.value)
 *     : nothingWithInspect()
 * 
 * console.log(validate({ isValid: true, value: 42 }))   // Just(42)
 * console.log(validate({ isValid: false }))             // Nothing
 * console.log(validate({ isValid: true }))              // Nothing
 * 
 * // Comparison with standard nothing
 * import { nothing } from "../nothing/index.ts"
 * 
 * const standard = nothing()
 * const enhanced = nothingWithInspect()
 * 
 * console.log(standard)  // { _tag: "Nothing" }
 * console.log(enhanced)  // Nothing
 * 
 * // Both work identically in operations
 * map((x: number) => x * 2)(standard)  // Nothing
 * map((x: number) => x * 2)(enhanced)  // Nothing
 * 
 * // Array of Maybe values with mixed constructors
 * const parseNumbers = (strings: Array<string>): Array<Maybe<number>> =>
 *   strings.map(s => {
 *     const n = parseInt(s, 10)
 *     return isNaN(n) ? nothingWithInspect() : justWithInspect(n)
 *   })
 * 
 * console.log(parseNumbers(["1", "abc", "2", "", "3"]))
 * // [ Just(1), Nothing, Just(2), Nothing, Just(3) ]
 * 
 * // Using in error reporting
 * const processResults = (results: Array<Maybe<string>>) => {
 *   results.forEach((result, index) => {
 *     console.log(`Result ${index + 1}: ${result}`)
 *   })
 * }
 * 
 * processResults([
 *   justWithInspect("success"),
 *   nothingWithInspect(),
 *   justWithInspect("done")
 * ])
 * // Result 1: Just("success")
 * // Result 2: Nothing
 * // Result 3: Just("done")
 * 
 * // Type inference works correctly
 * const maybeNumber: Maybe<number> = nothingWithInspect()
 * const maybeString: Maybe<string> = nothingWithInspect()
 * const maybeUser: Maybe<{ id: number; name: string }> = nothingWithInspect()
 * 
 * console.log(maybeNumber)  // Nothing
 * console.log(maybeString)  // Nothing
 * console.log(maybeUser)    // Nothing
 * ```
 * 
 * @property Enhanced-debugging - Better console.log output
 * @property Same-behavior - Functionally identical to standard nothing
 * @property REPL-friendly - Makes debugging Maybe chains easier
 */
const nothingWithInspect = <A = never>(): Maybe<A> => {
	return withInspect(
		nothing<A>(),
		() => "Nothing"
	)
}

export default nothingWithInspect