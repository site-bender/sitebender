import type { Result } from "../../../types/fp/result/index.ts"
import chainEither from "../../either/chain/index.ts"

/**
 * Flat maps over the Ok value of a Result (monadic bind)
 * 
 * Wrapper around Either's chain with Result-specific naming.
 * Applies a function that returns a Result, flattening the nested Result.
 * 
 * @curried
 * @param fn - Function that returns a new Result
 * @param result - The Result to chain over
 * @returns The Result returned by fn, or the original Err
 * @example
 * ```typescript
 * const safeDivide = (x: number) => x === 0 
 *   ? err("Division by zero") 
 *   : ok(10 / x)
 * 
 * chain(safeDivide)(ok(2))  // ok(5)
 * chain(safeDivide)(ok(0))  // err("Division by zero")
 * chain(safeDivide)(err("previous"))  // err("previous")
 * ```
 */
const chain = chainEither as <T, U, E>(
	fn: (value: T) => Result<U, E>
) => (result: Result<T, E>) => Result<U, E>

export default chain