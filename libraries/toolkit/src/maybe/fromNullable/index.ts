import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNullish from "../../simple/validation/isNullish/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"

/**
 * Converts a nullable value to a Maybe
 *
 * Safely wraps a value that might be null or undefined into the Maybe context.
 * Non-null values become Just, while null and undefined become Nothing. This
 * is the primary entry point for bringing nullable values from JavaScript/TypeScript
 * into the safe Maybe monad, enabling functional handling of optional values.
 *
 * @param value - The nullable value to convert
 * @returns Just if value is not null/undefined, otherwise Nothing
 * @pure
 * @example
 * ```typescript
 * // Basic nullable conversion
 * fromNullable(42)          // Just(42)
 * fromNullable(null)        // Nothing
 * fromNullable(undefined)   // Nothing
 * fromNullable("")          // Just("") - empty string is not null
 * fromNullable(0)           // Just(0) - zero is not null
 * fromNullable(false)       // Just(false) - false is not null
 *
 * // Object property access
 * interface User {
 *   id: number
 *   name: string
 *   email?: string
 *   age?: number | null
 * }
 *
 * const user: User = {
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com",
 *   age: null
 * }
 *
 * fromNullable(user.email)  // Just("alice@example.com")
 * fromNullable(user.age)    // Nothing (null)
 *
 * // Array element access
 * const arr = [1, 2, 3]
 * fromNullable(arr[0])   // Just(1)
 * fromNullable(arr[10])  // Nothing (undefined)
 *
 * // Function return values
 * const find = <T>(arr: Array<T>, predicate: (item: T) => boolean): T | undefined =>
 *   arr.find(predicate)
 *
 * const safeFindUser = (users: Array<User>, id: number): Maybe<User> =>
 *   fromNullable(find(users, u => u.id === id))
 *
 * safeFindUser(users, 1)  // Just({ id: 1, name: "Alice" })
 * safeFindUser(users, 3)  // Nothing
 *
 * // Chaining with other Maybe operations
 * import pipe from "../../simple/combinator/pipe/index.ts"
 * import map from "../map/index.ts"
 * import getOrElse from "../getOrElse/index.ts"
 *
 * const processNullable = (value: string | null | undefined): string =>
 *   pipe(
 *     fromNullable(value),
 *     map(s => s.trim()),
 *     map(s => s.toUpperCase()),
 *     getOrElse(() => "DEFAULT")
 *   )
 *
 * processNullable("  hello  ")  // "HELLO"
 * processNullable(null)         // "DEFAULT"
 * processNullable(undefined)    // "DEFAULT"
 * ```
 */
const fromNullable = <A>(value: A | null | undefined): Maybe<A> => {
	return isNullish(value) ? nothing() : just(value)
}

export default fromNullable
