import type { Result } from "../../types/fp/result/index.ts"

import isLeft from "../../either/isLeft/index.ts"

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
// Note on generics: we bind E and B on the first call, and A on the second.
// This preserves good type inference when using the curried style
// fold(onErr)(onOk)(result) without forcing A to become unknown.
const fold = <E, B>(
	onErr: (error: E) => B,
) =>
<A>(
	onOk: (value: A) => B,
) =>
(
	result: Result<A, E>,
): B => {
	const e = result as unknown as { _tag: string; left?: E; right?: A }
	if (isLeft(e as never)) return onErr(e.left as E)
	return onOk(e.right as A)
}

export default fold
