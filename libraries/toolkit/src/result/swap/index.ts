import type { Result } from "../../types/fp/result/index.ts"
import swapEither from "../../either/swap/index.ts"

/**
 * Swaps Ok and Err values in a Result
 * 
 * Wrapper around Either's swap with Result-specific naming.
 * Converts Ok to Err and Err to Ok, swapping the value positions.
 * 
 * @param result - The Result to swap
 * @returns A new Result with Ok and Err swapped
 * @example
 * ```typescript
 * swap(ok(42))  // err(42)
 * swap(err("failed"))  // ok("failed")
 * ```
 */
const swap = swapEither as <T, E>(result: Result<T, E>) => Result<E, T>

export default swap