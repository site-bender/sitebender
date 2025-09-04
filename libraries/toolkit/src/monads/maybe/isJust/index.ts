import type { Just, Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Type guard that checks if a Maybe value is Just
 *
 * Pure predicate function that determines whether a Maybe contains a value
 * (Just) or is absent (Nothing). This type guard narrows the type in TypeScript,
 * allowing safe access to the value property within conditional blocks. Essential
 * for pattern matching and conditional logic with Maybe values.
 *
 * @param maybe - The Maybe value to check
 * @returns True if the Maybe is Just, false if Nothing
 * @example
 * ```typescript
 * // Basic type checking
 * isJust(just(42))     // true
 * isJust(nothing())    // false
 *
 * // Type narrowing in conditionals
 * const maybe = just("hello") as Maybe<string>
 * if (isJust(maybe)) {
 *   console.log(maybe.value.toUpperCase())  // "HELLO"
 * }
 *
 * // Pattern matching style
 * const describeMaybe = <T>(maybe: Maybe<T>): string =>
 *   isJust(maybe) ? `Has value: ${maybe.value}` : "No value"
 *
 * // Filtering arrays of Maybe values
 * const maybes = [just(1), nothing(), just(2), nothing(), just(3)]
 * const values = maybes.filter(isJust).map(j => j.value)  // [1, 2, 3]
 *
 * // Using with reduce for aggregations
 * const sumJustValues = (maybes: Array<Maybe<number>>): number =>
 *   maybes.reduce((sum, maybe) =>
 *     isJust(maybe) ? sum + maybe.value : sum,
 *     0
 *   )
 *
 * // Finding first Just value
 * const firstJust = <T>(maybes: Array<Maybe<T>>): Maybe<T> =>
 *   maybes.find(isJust) || nothing()
 *
 * // Counting present values
 * const countJust = <T>(maybes: Array<Maybe<T>>): number =>
 *   maybes.filter(isJust).length
 * ```
 *
 * @pure
 * @predicate
 */
const isJust = <A>(maybe: Maybe<A>): maybe is Just<A> => {
	return maybe._tag === "Just"
}

export default isJust
