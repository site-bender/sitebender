import type { IOMaybe } from "../../types/fp/io/index.ts"

import isJust from "../../maybe/isJust/index.ts"
import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"

/**
 * Maps a function over the Maybe value inside IOMaybe
 *
 * Transforms the eventual Maybe result of an IOMaybe computation by applying
 * a function to Just values while leaving Nothing unchanged. This allows
 * safe transformation chains where the function is only applied if a value
 * is present, maintaining the short-circuiting behavior of Maybe.
 *
 * @param f - Function to transform the value inside Just
 * @param ioMaybe - IOMaybe to transform
 * @returns New IOMaybe with transformed Just values
 * @pure
 * @curried
 * @example
 * ```typescript
 * import { ioMaybe } from "../ioMaybe/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 *
 * // Basic transformation
 * const numberMaybeIO = ioMaybe(() => just(42))
 * const doubledIO = mapIOMaybe((x: number) => x * 2)(numberMaybeIO)
 * runIO(doubledIO)                         // Just(84)
 *
 * const nothingIO = ioMaybe(() => nothing())
 * const mappedNothingIO = mapIOMaybe((x: number) => x * 2)(nothingIO)
 * runIO(mappedNothingIO)                   // Nothing
 *
 * // String transformations
 * const greetingIO = ioMaybe(() => just("hello"))
 * const upperIO = mapIOMaybe((s: string) => s.toUpperCase())(greetingIO)
 * runIO(upperIO)                           // Just("HELLO")
 *
 * // Array operations
 * const numbersIO = ioMaybe(() => just([1, 2, 3, 4, 5]))
 * const evenNumbersIO = mapIOMaybe((arr: Array<number>) =>
 *   arr.filter(x => x % 2 === 0)
 * )(numbersIO)
 * runIO(evenNumbersIO)                     // Just([2, 4])
 *
 * // Safe parsing with transformation
 * const parseNumberIO = ioMaybe(() => {
 *   const input = "42.5"
 *   const parsed = parseFloat(input)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * })
 * const roundedIO = mapIOMaybe((n: number) => Math.round(n))(parseNumberIO)
 * runIO(roundedIO)                         // Just(43)
 *
 * // Chaining transformations
 * const idIO = ioMaybe(() => just("user-123"))
 * const prefixedIO = mapIOMaybe((id: string) => `ID:${id}`)(idIO)
 * const upperCaseIO = mapIOMaybe((prefixed: string) => prefixed.toUpperCase())(prefixedIO)
 * runIO(upperCaseIO)                       // Just("ID:USER-123")
 * ```
 */
const mapIOMaybe =
	<A, B>(f: (a: A) => B) => (ioMaybe: IOMaybe<A>): IOMaybe<B> => () => {
		const maybeValue = ioMaybe()
		return isJust(maybeValue) ? just(f(maybeValue.value)) : nothing()
	}

export default mapIOMaybe
