import type { Maybe } from "../../types/fp/maybe/index.ts"

import withInspect from "../../debug/withInspect/index.ts"
import nothing from "../nothing/index.ts"

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
 *   justWithInspect(2)
 * ]
 * console.log(results)  // [ Just(1), Nothing, Just(2) ]
 *
 * // Maintains all Maybe functionality
 * pipe(
 *   nothingWithInspect(),
 *   map((x: number) => x * 2),
 *   map((x: number) => x + 5),
 *   getOrElse(() => 0)
 * )  // 0 (default value)
 *
 * // The inspection is non-enumerable
 * const n = nothingWithInspect()
 * Object.keys(n)  // ["_tag"]
 * JSON.stringify(n)  // '{"_tag":"Nothing"}'
 *
 * // Useful for debugging chains
 * const safeDivide = (a: number) => (b: number) =>
 *   b === 0 ? nothingWithInspect() : justWithInspect(a / b)
 *
 * console.log(safeDivide(10)(2))   // Just(5)
 * console.log(safeDivide(10)(0))   // Nothing
 *
 * // Comparison with standard nothing
 * const standard = nothing()
 * const enhanced = nothingWithInspect()
 * console.log(standard)  // { _tag: "Nothing" }
 * console.log(enhanced)  // Nothing
 *
 * // Type inference works correctly
 * const maybeNumber: Maybe<number> = nothingWithInspect()
 * const maybeString: Maybe<string> = nothingWithInspect()
 * console.log(maybeNumber)  // Nothing
 * console.log(maybeString)  // Nothing
 * ```
 *
 * @impure
 */
const nothingWithInspect = <A = never>(): Maybe<A> => {
	return withInspect(
		nothing<A>(),
		() => "Nothing",
	)
}

export default nothingWithInspect
