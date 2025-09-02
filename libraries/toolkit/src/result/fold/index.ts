import type { Result } from "../../types/fp/result/index.ts"

import foldEither from "../../either/fold/index.ts"

/**
 * Folds a Result to a single value using handlers for both cases
 *
 * Wrapper around Either's fold with Result-specific naming.
 * Reduces a Result to a single value by applying the appropriate handler.
 *
 * @curried
 * @param onErr - Function to handle Err case
 * @param onOk - Function to handle Ok case
 * @param result - The Result to fold
 * @returns The value returned by the appropriate handler
 * @example
 * ```typescript
 * const toNumber = fold(
 *   (e: string) => 0,  // Err case returns 0
 *   (x: number) => x   // Ok case returns the value
 * )
 *
 * toNumber(ok(42))  // 42
 * toNumber(err("failed"))  // 0
 * ```
 */
const fold = foldEither as <E, A, B>(
	onErr: (error: E) => B,
	onOk: (value: A) => B,
) => (result: Result<A, E>) => B

export default fold
