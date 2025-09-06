import type { Result } from "../../types/fp/result/index.ts"

import isLeft from "../../either/isLeft/index.ts"
import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"

/**
 * Maps functions over both Err and Ok values
 *
 * Wrapper around Either's bimap with Result-specific naming.
 * Applies one function to Err values and another to Ok values.
 *
 * @curried
 * @param onErr - Function to transform Err values
 * @param onOk - Function to transform Ok values
 * @param result - The Result to transform
 * @returns A new Result with both sides potentially transformed
 * @example
 * ```typescript
 * const transform = bimap(
 *   (e: string) => e.toUpperCase(),
 *   (x: number) => x * 2
 * )
 *
 * transform(ok(5))  // ok(10)
 * transform(err("fail"))  // err("FAIL")
 * ```
 */
const bimap = <E, F, A, B>(
	onErr: (error: E) => F,
	onOk: (value: A) => B,
) =>
(result: Result<A, E>): Result<B, F> => {
	const e = result as unknown as { _tag: string; left?: E; right?: A }
	if (isLeft(e as never)) {
		return left(onErr(e.left as E)) as unknown as Result<B, F>
	}
	return right(onOk(e.right as A)) as unknown as Result<B, F>
}

export default bimap
