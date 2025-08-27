/**
 * Creates a predicate that returns true when neither condition is true
 *
 * Binary combinator that creates a new predicate function checking that neither
 * of two predicates returns true for a given value. Equivalent to NOR logic gate
 * or !(A || B). Returns true only when both predicates return false. Useful for
 * exclusion logic, negative conditions, and complement sets.
 *
 * Truth table:
 * - both false → true
 * - first true, second false → false
 * - first false, second true → false
 * - both true → false
 *
 * @pure
 * @curried
 * @predicate
 * @param predA - First predicate function
 * @param predB - Second predicate function
 * @returns A predicate that returns true when neither input predicate is true
 * @example
 * ```typescript
 * // Basic usage
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 * const neitherPositiveNorEven = neither(isPositive, isEven)
 * 
 * neitherPositiveNorEven(-3)    // true (negative and odd)
 * neitherPositiveNorEven(-2)    // false (negative but even)
 * neitherPositiveNorEven(3)     // false (positive)
 *
 * // Validation exclusions
 * const isNull = (v: unknown) => v === null
 * const isUndefined = (v: unknown) => v === undefined
 * const hasValue = neither(isNull, isUndefined)
 *
 * hasValue(null)                // false
 * hasValue(0)                   // true
 *
 * // Range exclusion  
 * const tooSmall = (n: number) => n < 10
 * const tooBig = (n: number) => n > 100
 * const inRange = neither(tooSmall, tooBig)
 *
 * inRange(5)                    // false
 * inRange(50)                   // true
 *
 * // De Morgan's Law: neither(A, B) === !A && !B
 * ```
 */
const neither =
	<T>(predA: (value: T) => boolean, predB: (value: T) => boolean) =>
	(value: T): boolean => !predA(value) && !predB(value)

export default neither
