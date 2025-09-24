/**
 * Functional programming compose utility
 * Composes functions right-to-left (mathematical composition)
 *
 * @param fns - Array of functions to compose
 * @returns Function that takes input and applies all functions in reverse sequence
 * @pure
 * @example
 * ```typescript
 * const add5 = (x: number) => x + 5
 * const multiply2 = (x: number) => x * 2
 * const composed = compose([multiply2, add5])
 * composed(3) // 16 (first adds 5 to get 8, then multiplies by 2)
 *
 * // String transformations
 * const toUpper = (s: string) => s.toUpperCase()
 * const trim = (s: string) => s.trim()
 * const transform = compose([toUpper, trim])
 * transform("  hello  ") // "HELLO"
 *
 * // Empty array returns identity
 * const identity = compose([])
 * identity(42) // 42
 * ```
 *
 * Note: TypeScript cannot properly type variadic compose without extensive overloads.
 * The 'any' type here is justified because:
 * 1. Each function's output type becomes the previous function's input type
 * 2. This creates a chain of dependent types that TypeScript cannot infer without overloads
 * 3. The alternative would be 20+ overloads for different arities
 */
// deno-lint-ignore no-explicit-any
const compose = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduceRight((out, fn) => fn(out), input)

export default compose
