import type { IOMaybe } from "../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import nothing from "../../maybe/nothing/index.ts"

/**
 * Flat maps a function returning IOMaybe over the Maybe value inside IOMaybe
 *
 * Enables sequencing of IOMaybe computations where the second computation depends
 * on the result of the first. This is the monadic bind operation for IOMaybe that
 * prevents nested IOMaybe<Maybe<A>> structures. If the first IOMaybe produces
 * Nothing, the function is not called and Nothing is returned immediately.
 *
 * @curried (f) => (ioMaybe) => chainedIOMaybe
 * @param f - Function that takes a value and returns an IOMaybe
 * @param ioMaybe - IOMaybe to chain from
 * @returns New IOMaybe representing the sequenced computation
 * @example
 * ```typescript
 * // Chain successful IOMaybe operations
 * const getUserIdIO = ioMaybe(() => just("user-123"))
 * const fetchUserIO = (id: string) => ioMaybe(() =>
 *   id.startsWith("user-") ? just({ id, name: "Alice" }) : nothing()
 * )
 * const userDataIO = chainIOMaybe(fetchUserIO)(getUserIdIO)
 * runIO(userDataIO)                        // Just({ id: "user-123", name: "Alice" })
 *
 * // Nothing short-circuits the chain
 * const emptyIO = ioMaybe(() => nothing())
 * const neverRunIO = chainIOMaybe(() => ioMaybe(() => just("value")))(emptyIO)
 * runIO(neverRunIO)                        // Nothing
 *
 * // Multiple validation steps
 * const parseJsonIO = ioMaybe(() => {
 *   try {
 *     return just(JSON.parse('{"name": "Alice"}'))
 *   } catch {
 *     return nothing()
 *   }
 * })
 *
 * const validateIO = (data: any) => ioMaybe(() =>
 *   data.name ? just(data) : nothing()
 * )
 *
 * const validatedIO = chainIOMaybe(validateIO)(parseJsonIO)
 * runIO(validatedIO)                       // Just({ name: "Alice" })
 * ```
 * @pure
 * @curried
 */
const chainIOMaybe =
	<A, B>(f: (a: A) => IOMaybe<B>) =>
	(ioMaybe: IOMaybe<A>): IOMaybe<B> =>
	() => {
		const maybeValue = ioMaybe()
		return isJust(maybeValue) ? f(maybeValue.value)() : nothing()
	}

export default chainIOMaybe
