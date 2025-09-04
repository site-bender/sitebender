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
 * @curried
 * @param fn - Function to transform the Just value
 * @param maybe - The Maybe to map over
 * @returns A new Maybe with the transformed value or unchanged Nothing
 * @example
 * ```typescript
 * // Basic transformation of Just values
 * const double = (x: number) => x * 2
 * map(double)(just(5))    // Just(10)
 * map(double)(nothing())  // Nothing - unchanged
 *
 * // Chaining transformations
 * pipe(
 *   just(5),
 *   map(double),    // Just(10)
 *   map(x => x + 1),    // Just(11)
 *   map(x => x.toString())   // Just("11")
 * )
 *
 * // Short-circuits on Nothing
 * pipe(
 *   nothing(),
 *   map(double),    // Nothing
 *   map(x => x + 1),    // Nothing
 *   map(x => x.toString())   // Nothing
 * )
 *
 * // Working with objects
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 * }
 *
 * pipe(
 *   just({ id: 1, name: "Alice", age: 30 }),
 *   map((u: User) => u.name),  // Just("Alice")
 *   map(s => s.toUpperCase())   // Just("ALICE")
 * )
 *
 * // Partial application for reusable transformers
 * const doubleMaybe = map((x: number) => x * 2)
 * doubleMaybe(just(5))    // Just(10)
 * doubleMaybe(nothing())  // Nothing
 *
 * // Type transformations
 * pipe(
 *   just("123"),
 *   map(s => parseInt(s, 10)),      // Just(123)
 *   map(n => n > 100),               // Just(true)
 *   map(b => b ? "valid" : "invalid") // Just("valid")
 * )
 *
 * // Working with arrays inside Maybe
 * pipe(
 *   just([1, 2, 3, 4, 5]),
 *   map(arr => arr.filter(x => x > 2)),      // Just([3, 4, 5])
 *   map(arr => arr.reduce((a, b) => a + b, 0)) // Just(12)
 * )
 * ```
 *
 * @pure
 * @curried
 */
const map = <A, B>(fn: (a: A) => B) => (maybe: Maybe<A>): Maybe<B> => {
	if (isNothing(maybe)) {
		return maybe
	}

	return just(fn(maybe.value))
}

export default map
