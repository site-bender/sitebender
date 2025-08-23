import type { Result } from "../../types/fp/result/index.ts"
import either from "../../either/either/index.ts"

/**
 * Extracts value from Result using error and success handlers
 * 
 * Wrapper around Either's either function with Result-specific naming.
 * Applies one of two functions based on whether the Result is Err or Ok.
 * 
 * @curried
 * @param onErr - Function to handle Err case
 * @param onOk - Function to handle Ok case
 * @param result - The Result to extract from
 * @returns The value returned by the appropriate handler
 * @example
 * ```typescript
 * const handleError = (e: string) => `Error: ${e}`
 * const handleSuccess = (x: number) => `Success: ${x}`
 * 
 * const extract = result(handleError)(handleSuccess)
 * 
 * extract(ok(42))  // "Success: 42"
 * extract(err("failed"))  // "Error: failed"
 * ```
 */
const result = either as <E, A, B>(
	onErr: (error: E) => B
) => (
	onOk: (value: A) => B
) => (
	result: Result<A, E>
) => B

export default result