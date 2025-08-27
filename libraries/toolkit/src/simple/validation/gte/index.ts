/**
 * Creates a predicate that checks if a value is greater than or equal to a threshold
 *
 * Performs a greater-than-or-equal comparison using JavaScript's >= operator. This is a
 * curried function that creates reusable comparison predicates. Works with any values
 * that can be compared with >=, including numbers, strings (alphabetical), and dates
 * (chronological). Uses type coercion rules when comparing different types.
 *
 * Comparison behavior:
 * - Numbers: numerical comparison
 * - Strings: lexicographical comparison
 * - Dates: chronological comparison (via valueOf)
 * - Mixed types: follows JavaScript coercion rules
 * - NaN: always returns false (NaN >= anything is false)
 *
 * @pure
 * @curried
 * @predicate
 * @param threshold - The minimum value (inclusive)
 * @param value - The value to check if greater than or equal to threshold
 * @returns True if value >= threshold, false otherwise
 * @example
 * ```typescript
 * // Basic comparisons
 * const isNonNegative = gte(0)
 * isNonNegative(5)      // true
 * isNonNegative(0)      // true (equal counts)
 * isNonNegative(-1)     // false
 *
 * // String comparisons
 * const fromM = gte("M")
 * fromM("M")            // true (equal)
 * fromM("N")            // true
 * fromM("L")            // false
 *
 * // Date comparisons
 * const from2024 = gte(new Date("2024-01-01"))
 * from2024(new Date("2024-06-01"))  // true
 *
 * // Filtering arrays
 * const scores = [65, 70, 89, 94, 58, 77]
 * scores.filter(gte(70))  // [70, 89, 94, 77]
 *
 * // Edge cases
 * gte(5)(NaN)           // false
 * gte(Infinity)(Infinity) // true
 * ```
 */
const gte = <T>(threshold: T) => <U>(value: U): boolean => value >= threshold

export default gte
