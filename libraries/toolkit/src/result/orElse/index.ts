import type { Result } from "../../types/fp/result/index.ts"

import orElseEither from "../../either/orElse/index.ts"

/**
 * Returns an alternative Result if the current one is Err
 *
 * Wrapper around Either's orElse with Result-specific naming.
 * Provides a fallback Result for error recovery.
 *
 * @curried
 * @param alternative - Function that returns an alternative Result
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
const orElse = orElseEither as <E, T, F>(
	alternative: (error: E) => Result<T, F>,
) => (result: Result<T, E>) => Result<T, F>

export default orElse
