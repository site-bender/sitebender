/**
 * Creates a predicate that checks if a value is greater than a threshold
 *
 * Performs a greater-than comparison using JavaScript's > operator. This is a
 * curried function that creates reusable comparison predicates. Works with any
 * values that can be compared with >, including numbers, strings (alphabetical),
 * and dates (chronological). Uses type coercion rules when comparing different types.
 *
 * Comparison behavior:
 * - Numbers: numerical comparison
 * - Strings: lexicographical comparison
 * - Dates: chronological comparison (via valueOf)
 * - Mixed types: follows JavaScript coercion rules
 * - NaN: always returns false (NaN > anything is false)
 *
 * @pure
 * @curried
 * @predicate
 * @param threshold - The value to compare against
 * @param value - The value to check if greater than threshold
 * @returns True if value > threshold, false otherwise
 * @example
 * ```typescript
 * // Basic comparisons
 * const isPositive = gt(0)
 * isPositive(5)        // true
 * isPositive(-3)       // false
 *
 * // String comparisons
 * const afterM = gt("M")
 * afterM("N")          // true
 * afterM("A")          // false
 *
 * // Date comparisons
 * const after2024 = gt(new Date("2024-01-01"))
 * after2024(new Date("2024-06-01"))  // true
 *
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20, 25]
 * numbers.filter(gt(10))  // [15, 20, 25]
 *
 * // Edge cases
 * gt(5)(NaN)           // false
 * gt(1000)(Infinity)   // true
 * ```
 */
const gt = <T>(threshold: T) => <U extends T>(value: U): boolean =>
	value > threshold

export default gt
