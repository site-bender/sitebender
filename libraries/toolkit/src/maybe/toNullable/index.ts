import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Converts a Maybe to a nullable value
 *
 * Extracts the value from a Maybe, returning null for Nothing cases.
 * This is the inverse of fromNullable and provides a way to exit the
 * Maybe context when interfacing with APIs or code that expects nullable
 * values. Just values are unwrapped to their contained value, while
 * Nothing becomes null.
 *
 * @param maybe - The Maybe to convert
 * @returns The Just value or null if Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic conversion
 * toNullable(just(42))     // 42
 * toNullable(nothing())    // null
 * toNullable(just("hello")) // "hello"
 * 
 * // Round-trip with fromNullable
 * import { fromNullable } from "../fromNullable/index.ts"
 * toNullable(fromNullable(42))    // 42
 * toNullable(fromNullable(null))  // null
 * 
 * // API response preparation
 * const prepareResponse = (
 *   email: Maybe<string>,
 *   phone: Maybe<string>
 * ) => ({
 *   email: toNullable(email),
 *   phone: toNullable(phone)
 * })
 * 
 * // Chaining with other operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * const processAndConvert = (input: Maybe<number>): number | null =>
 *   pipe(
 *     input,
 *     map(x => x * 2),
 *     toNullable
 *   )
 * 
 * processAndConvert(just(30))   // 60
 * processAndConvert(nothing())  // null
 * ```
 *
 * @pure
 */
const toNullable = <A>(maybe: Maybe<A>): A | null => {
	if (isNothing(maybe)) {
		return null
	}

	return maybe.value
}

export default toNullable
