/**
 * Creates a curried less-than comparison predicate
 *
 * Returns a function that checks if a value is less than the provided threshold.
 * Uses JavaScript's less-than operator with its standard coercion rules for
 * non-numeric values. For strict numeric comparison, ensure both values are
 * numbers. Useful for filtering, validation, and conditional logic.
 *
 * Comparison rules:
 * - Numeric: standard less-than comparison
 * - Strings: lexicographic comparison
 * - Mixed types: JavaScript coercion applies
 * - NaN: always returns false (NaN < anything is false)
 * - null/undefined: coerced to numbers (null = 0, undefined = NaN)
 *
 * @pure
 * @curried
 * @predicate
 * @param threshold - The value to compare against
 * @returns A predicate function that returns true if input < threshold
 * @example
 * ```typescript
 * // Basic comparisons
 * const lessThan10 = lt(10)
 * lessThan10(5)                        // true
 * lessThan10(10)                       // false
 * lessThan10(15)                       // false
 *
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20]
 * numbers.filter(lt(10))               // [1, 5]
 *
 * // String comparisons (lexicographic)
 * const beforeM = lt("m")
 * beforeM("apple")                     // true
 * beforeM("zebra")                     // false
 *
 * // Date comparisons
 * const beforeToday = lt(new Date())
 * beforeToday(new Date(Date.now() - 86400000)) // true (yesterday)
 *
 * // Edge cases
 * lt(5)(NaN)                           // false
 * lt(Infinity)(Number.MAX_VALUE)      // true
 *
 * // Range checking
 * const isInRange = (min: number, max: number) =>
 *   (value: number) => !lt(min)(value) && lt(max)(value)
 * ```
 */
const lt = <T>(threshold: T) => (value: T): boolean => value < threshold

export default lt
