import type { Either, Right } from "../../types/fp/either/index.ts"

/**
 * Creates a Right value representing the success case in an Either
 *
 * The Right constructor is used to represent successful computations or
 * valid values in functional error handling. Right values will have
 * operations like map and chain applied to them, allowing composition
 * of successful computations in a type-safe manner.
 *
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
 * // { _tag: "Right", right: { id: 1, name: "Alice", email: "alice@example.com" } }
 *
 * // Type-safe success handling
 * import { left } from "../left/index.ts"
 *
 * const safeParse = (json: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(json))
 *   } catch (e) {
 *     return left(`Parse error: ${e}`)
 *   }
 * }
 *
 * safeParse('{"valid": "json"}')  // Right({ valid: "json" })
 * safeParse('invalid json')       // Left("Parse error: ...")
 *
 * // Chaining successful operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 *
 * const double = (x: number) => x * 2
 * const addTen = (x: number) => x + 10
 *
 * pipe(
 *   right(5),
 *   map(double),  // Right(10)
 *   map(addTen)   // Right(20)
 * )
 *
 * // Building computation pipelines
 * const divide = (a: number) => (b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 *
 * const sqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot take sqrt of negative") : right(Math.sqrt(n))
 *
 * import { chain } from "../chain/index.ts"
 *
 * pipe(
 *   right(16),
 *   chain(sqrt),        // Right(4)
 *   chain(divide(100))  // Right(25)
 * )
 *
 * // Wrapping nullable values
 * const fromNullable = <T>(value: T | null | undefined): Either<string, T> =>
 *   value == null ? left("Value is null or undefined") : right(value)
 *
 * fromNullable(42)        // Right(42)
 * fromNullable(null)      // Left("Value is null or undefined")
 * fromNullable(undefined) // Left("Value is null or undefined")
 *
 * // Using with async operations
 * const fetchUser = async (id: number): Promise<Either<string, User>> => {
 *   try {
 *     const response = await fetch(`/api/users/${id}`)
 *     if (!response.ok) {
 *       return left(`HTTP ${response.status}: ${response.statusText}`)
 *     }
 *     const user = await response.json()
 *     return right(user)
 *   } catch (error) {
 *     return left(`Network error: ${error}`)
 *   }
 * }
 * ```
 *
 * @property Pure - No side effects, always returns same output for same input
 * @property Type-safe - Success values are encoded in the type system
 * @property Composable - Works seamlessly with other Either functions
 */
const right = <A, E = never>(value: A): Either<E, A> => ({
	_tag: "Right" as const,
	right: value,
} as Right<A>)

export default right
