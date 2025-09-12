/**
 * Creates a predicate that returns true when none of the predicates pass
 *
 * Takes an array of predicate functions and returns a new predicate that
 * returns true only when ALL provided predicates return false. This is the
 * opposite of anyPass/some. Useful for ensuring a value doesn't match any
 * of several conditions, validation exclusions, and blacklist filtering.
 *
 * Evaluation rules:
 * - Returns true if all predicates return false
 * - Returns false if any predicate returns true
 * - Short-circuits on first true (stops evaluation)
 * - Empty array returns true (vacuous truth)
 *
 * @pure
 * @curried
 * @predicate
 * @param predicates - Array of predicate functions to test
 * @returns A predicate that returns true when no input predicates pass
 * @example
 * ```typescript
 * // Basic usage
 * const isEven = (n: number) => n % 2 === 0
 * const isNegative = (n: number) => n < 0
 * const isZero = (n: number) => n === 0
 * const noneOfThese = nonePass([isEven, isNegative, isZero])
 *
 * noneOfThese(5)                       // true (odd, positive, non-zero)
 * noneOfThese(2)                       // false (even)
 *
 * // String validation exclusions
 * const isEmpty = (s: string) => s.length === 0
 * const hasSpaces = (s: string) => /\s/.test(s)
 * const hasNumbers = (s: string) => /\d/.test(s)
 * const isSimpleWord = nonePass([isEmpty, hasSpaces, hasNumbers])
 *
 * isSimpleWord("hello")                // true
 * isSimpleWord("hello world")          // false (has space)
 *
 * // Type exclusion
 * const isNull = (v: unknown) => v === null
 * const isUndefined = (v: unknown) => v === undefined
 * const isNormalValue = nonePass([isNull, isUndefined])
 *
 * isNormalValue(42)                    // true
 * isNormalValue(null)                  // false
 *
 * // Empty array returns true (vacuous truth)
 * nonePass<number>([])(42)             // true
 * ```
 */
const nonePass =
	<T>(predicates: Array<(value: T) => boolean>) => (value: T): boolean =>
		!predicates.some((pred) => pred(value))

export default nonePass
