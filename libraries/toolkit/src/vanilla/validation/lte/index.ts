/**
 * Creates a curried less-than-or-equal comparison predicate
 *
 * Returns a function that checks if a value is less than or equal to the
 * provided threshold. Uses JavaScript's less-than-or-equal operator with its
 * standard coercion rules for non-numeric values. For strict numeric comparison,
 * ensure both values are numbers. Useful for filtering, validation, and boundary
 * checking.
 *
 * Comparison rules:
 * - Numeric: standard <= comparison
 * - Strings: lexicographic comparison
 * - Mixed types: JavaScript coercion applies
 * - NaN: always returns false (NaN <= anything is false)
 * - null/undefined: coerced to numbers (null = 0, undefined = NaN)
 *
 * @pure
 * @curried
 * @predicate
 * @param threshold - The value to compare against
 * @returns A predicate function that returns true if input <= threshold
 * @example
 * ```typescript
 * // Basic comparisons
 * const atMost10 = lte(10)
 * atMost10(5)                          // true
 * atMost10(10)                         // true (inclusive)
 * atMost10(15)                         // false
 *
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20]
 * numbers.filter(lte(10))              // [1, 5, 10]
 *
 * // String comparisons
 * const upToM = lte("m")
 * upToM("apple")                       // true
 * upToM("m")                           // true
 * upToM("zebra")                       // false
 *
 * // Date comparisons
 * const byDeadline = lte(new Date("2024-12-31"))
 * byDeadline(new Date("2024-06-01"))   // true
 *
 * // Range checking (inclusive)
 * const isInRange = (min: number, max: number) =>
 *   (value: number) => lte(min)(value) && lte(value)(max)
 *
 * // Edge cases
 * lte(5)(NaN)                          // false
 * lte(Infinity)(Infinity)              // true
 * ```
 */
const lte = <T>(threshold: T) => (value: T): boolean => value <= threshold

export default lte
