import type { Either, Right } from "../../types/fp/either/index.ts"

/**
 * Creates a Right value representing the success case in an Either
 *
 * The Right constructor is used to represent successful computations or
 * valid values in functional error handling. Right values will have
 * operations like map and chain applied to them, allowing composition
 * of successful computations in a type-safe manner.
 *
 * @pure
 * @param value - The success value to wrap in a Right
 * @returns A Right containing the success value
 * @example
 * ```typescript
 * // Basic success creation
 * const result = right(42)
 * // { _tag: "Right", right: 42 }
 *
 * // Complex success values
 * const user = right({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * })
 *
 * // Type-safe success handling
 * const safeParse = (json: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(json))
 *   } catch (e) {
 *     return left(`Parse error: ${e}`)
 *   }
 * }
 * safeParse('{"valid": "json"}')  // Right({ valid: "json" })
 * safeParse('invalid json')       // Left("Parse error: ...")
 *
 * // Chaining successful operations
 * const double = (x: number) => x * 2
 * const addTen = (x: number) => x + 10
 * pipe(
 *   right(5),
 *   map(double),  // Right(10)
 *   map(addTen)   // Right(20)
 * )
 *
 * // Building computation pipelines
 * const divide = (a: number) => (b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 * const sqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot take sqrt of negative") : right(Math.sqrt(n))
 * pipe(
 *   right(16),
 *   chain(sqrt),        // Right(4)
 *   chain(divide(100))  // Right(25)
 * )
 * ```
 */
const right = <A, E = never>(value: A): Either<E, A> => ({
	_tag: "Right" as const,
	right: value,
} as Right<A>)

export default right
