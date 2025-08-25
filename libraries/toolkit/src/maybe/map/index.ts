import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import just from "../just/index.ts"

/**
 * Maps a function over the value inside a Just
 *
 * Applies a transformation function to the value inside a Just, leaving
 * Nothing values unchanged. This is the fundamental operation for transforming
 * optional values while preserving the Maybe context. The map operation
 * short-circuits on Nothing values, making it safe to chain multiple
 * transformations without explicit null checking.
 *
 * @curried (fn) => (maybe) => result
 * @param fn - Function to transform the Just value
 * @param maybe - The Maybe to map over
 * @returns A new Maybe with the transformed value or unchanged Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic transformation of Just values
 * const double = (x: number) => x * 2
 *
 * map(double)(just(5))    // Just(10)
 * map(double)(nothing())  // Nothing - unchanged
 *
 * // Chaining transformations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * const addOne = (x: number) => x + 1
 * const toString = (x: number) => x.toString()
 *
 * pipe(
 *   just(5),
 *   map(double),    // Just(10)
 *   map(addOne),    // Just(11)
 *   map(toString)   // Just("11")
 * )
 *
 * // Short-circuits on Nothing
 * pipe(
 *   nothing(),
 *   map(double),    // Nothing - not executed
 *   map(addOne),    // Nothing - not executed
 *   map(toString)   // Nothing - not executed
 * )
 *
 * // Working with objects
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 * }
 *
 * const user: Maybe<User> = just({
 *   id: 1,
 *   name: "Alice",
 *   age: 30
 * })
 *
 * const getName = (u: User) => u.name
 * const toUpper = (s: string) => s.toUpperCase()
 *
 * pipe(
 *   user,
 *   map(getName),  // Just("Alice")
 *   map(toUpper)   // Just("ALICE")
 * )
 *
 * // Partial application for reusable transformers
 * const doubleMaybe = map((x: number) => x * 2)
 * const squareMaybe = map((x: number) => x * x)
 *
 * doubleMaybe(just(5))    // Just(10)
 * squareMaybe(just(5))    // Just(25)
 * doubleMaybe(nothing())  // Nothing
 *
 * // Building computation pipelines
 * const calculate = (input: Maybe<number>) =>
 *   pipe(
 *     input,
 *     map(x => x + 10),
 *     map(x => x * 2),
 *     map(x => x / 4)
 *   )
 *
 * calculate(just(5))     // Just(7.5) -> (5 + 10) * 2 / 4
 * calculate(nothing())   // Nothing
 *
 * // Type transformations
 * const parseResult: Maybe<string> = just("123")
 *
 * const parsed = pipe(
 *   parseResult,
 *   map(s => parseInt(s, 10)),      // Just(123)
 *   map(n => n > 100),               // Just(true)
 *   map(b => b ? "valid" : "invalid") // Just("valid")
 * )
 *
 * // Working with arrays inside Maybe
 * const numbers: Maybe<Array<number>> = just([1, 2, 3, 4, 5])
 *
 * pipe(
 *   numbers,
 *   map(arr => arr.filter(x => x > 2)),      // Just([3, 4, 5])
 *   map(arr => arr.map(x => x * 2)),         // Just([6, 8, 10])
 *   map(arr => arr.reduce((a, b) => a + b, 0)) // Just(24)
 * )
 *
 * // Safe property access chains
 * interface Config {
 *   server?: {
 *     host?: string
 *     port?: number
 *   }
 * }
 *
 * const getServerUrl = (config: Config): Maybe<string> => {
 *   const server = config.server ? just(config.server) : nothing()
 *
 *   return pipe(
 *     server,
 *     map(s => s.host ? just(s.host) : nothing()),
 *     chain(host => host),  // Flatten nested Maybe
 *     map(host => `https://${host}`)
 *   )
 * }
 *
 * // Date transformations
 * const maybeDate: Maybe<Date> = just(new Date("2024-01-01"))
 *
 * pipe(
 *   maybeDate,
 *   map(d => d.getFullYear()),     // Just(2024)
 *   map(year => year + 1),          // Just(2025)
 *   map(year => `Year: ${year}`)   // Just("Year: 2025")
 * )
 *
 * // Async transformation example (with promises)
 * const fetchUser = async (id: number): Promise<Maybe<User>> => {
 *   // ... fetch implementation
 *   return just({ id, name: "Bob", age: 25 })
 * }
 *
 * const userAge = await fetchUser(1).then(map(u => u.age))
 * // Just(25)
 *
 * // Composing with other Maybe operations
 * const processValue = (maybeNum: Maybe<number>): Maybe<string> =>
 *   pipe(
 *     maybeNum,
 *     map(n => n * 2),
 *     filter(n => n > 10),
 *     map(n => `Result: ${n}`)
 *   )
 *
 * processValue(just(6))   // Just("Result: 12")
 * processValue(just(3))   // Nothing (filtered out: 6 <= 10)
 * processValue(nothing()) // Nothing
 *
 * // Mapping with index for array operations
 * const indexedMap = <A, B>(
 *   fn: (value: A, index: number) => B
 * ) => (maybe: Maybe<Array<A>>): Maybe<Array<B>> =>
 *   map((arr: Array<A>) => arr.map(fn))(maybe)
 *
 * const addIndex = indexedMap((x, i) => `${i}: ${x}`)
 * addIndex(just(["a", "b", "c"]))
 * // Just(["0: a", "1: b", "2: c"])
 *
 * // Error recovery doesn't happen with map
 * const recovered = pipe(
 *   nothing() as Maybe<number>,
 *   map(x => x * 2),      // Nothing - still Nothing
 *   map(() => 42)         // Nothing - still Nothing, not Just(42)
 * )
 * // Use orElse or getOrElse for recovery
 * ```
 *
 * @property Functor-law - Satisfies identity and composition laws
 * @property Short-circuits - Nothing values pass through unchanged
 * @property Type-safe - Preserves Maybe context while transforming value type
 */
const map = <A, B>(fn: (a: A) => B) => (maybe: Maybe<A>): Maybe<B> => {
	if (isNothing(maybe)) {
		return maybe
	}

	return just(fn(maybe.value))
}

export default map
