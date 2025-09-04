import type { Result } from "../../types/fp/result/index.ts"

import mapEither from "../../either/map/index.ts"

/**
 * Maps a function over the Ok value of a Result
 *
 * Wrapper around Either's map with Result-specific naming.
 * Applies a transformation to Ok values, leaving Err unchanged.
 *
 * @curried
 * @param fn - Function to transform the Ok value
 * @param result - The Result to map over
 * @returns A new Result with transformed Ok value
 * @example
 * ```typescript
 * const double = (x: number) => x * 2
 * map(double)(ok(5))  // ok(10)
 * map(double)(err("fail"))  // err("fail")
 * ```
 */
const map = mapEither as <T, U>(
	fn: (value: T) => U,
) => <E>(result: Result<T, E>) => Result<U, E>

export default map
