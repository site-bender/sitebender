import type { Maybe, Nothing } from "../../types/fp/maybe/index.ts"

/**
 * Type guard that checks if a Maybe value is Nothing
 *
 * Pure predicate function that determines whether a Maybe is absent (Nothing)
 * or contains a value (Just). This type guard narrows the type in TypeScript,
 * enabling safe handling of absent values and early returns. Complements isJust
 * for complete pattern matching over Maybe values.
 *
 * @param maybe - The Maybe value to check
 * @returns True if the Maybe is Nothing, false if Just
 * @example
 * ```typescript
 * // Basic type checking
 * isNothing(nothing())   // true
 * isNothing(just(42))    // false
 *
 * // Early returns for absent values
 * const processData = <T>(maybe: Maybe<T>): T => {
 *   if (isNothing(maybe)) {
 *     throw new Error("No value present")
 *   }
 *   return maybe.value
 * }
 *
 * // Pattern matching style  
 * const describeMaybe = <T>(maybe: Maybe<T>): string =>
 *   isNothing(maybe) ? "Empty" : `Contains: ${maybe.value}`
 *
 * // Filtering for Nothing values
 * const maybes = [just(1), nothing(), just(2), nothing(), just(3)]
 * const countMissing = maybes.filter(isNothing).length  // 2
 *
 * // Default value handling
 * const getValueOrDefault = <T>(maybe: Maybe<T>, defaultValue: T): T =>
 *   isNothing(maybe) ? defaultValue : maybe.value
 *
 * // Validation with error messages
 * const validateRequired = <T>(maybe: Maybe<T>, fieldName: string): T => {
 *   if (isNothing(maybe)) {
 *     throw new Error(`${fieldName} is required`)
 *   }
 *   return maybe.value
 * }
 *
 * // Combining multiple Maybe values
 * interface FormData {
 *   name: Maybe<string>
 *   email: Maybe<string>
 *   age: Maybe<number>
 * }
 *
 * const isFormIncomplete = (form: FormData): boolean =>
 *   isNothing(form.name) || isNothing(form.email) || isNothing(form.age)
 *
 * // Guard clauses in functions
 * const calculateScore = (
 *   base: Maybe<number>,
 *   multiplier: Maybe<number>
 * ): number =>
 *   isNothing(base) || isNothing(multiplier)
 *     ? 0
 *     : base.value * multiplier.value
 * ```
 *
 * @pure
 * @predicate
 */
const isNothing = <A>(maybe: Maybe<A>): maybe is Nothing => {
	return maybe._tag === "Nothing"
}

export default isNothing
