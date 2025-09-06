import type { Result } from "../../types/fp/result/index.ts"

import isLeft from "../../either/isLeft/index.ts"

/**
 * Returns an alternative Result if the current one is Err

 * Recovery function receives the error and can compute a new Result.
 * If the input is Ok, it's returned unchanged.
 *
 * @curried
 * @param recover - Function taking the Err value and returning an alternative Result
 * @param result - The Result to check
 * @returns The original Result if Ok, otherwise the alternative
 * @example
 * ```typescript
 * const fallback = orElse(() => ok(0))
 *
 * fallback(ok(42))  // ok(42)
 * fallback(err("failed"))  // ok(0)
 *
 * const tryAgain = orElse((e: string) =>
 *   e === "retry" ? ok(1) : err("fatal")
 * )
 *
 * tryAgain(err("retry"))  // ok(1)
 * tryAgain(err("other"))  // err("fatal")
 * ```
 */
const orElse = <E, A, F>(
	recover: (error: E) => Result<A, F>,
) =>
(
	result: Result<A, E>,
): Result<A, F> => {
	const e = result as unknown as { _tag: string; left?: E; right?: A }
	return isLeft(e as never) ? recover(e.left as E) : (e as Result<A, F>)
}

export default orElse
