/**
 * Checks if two values are not equal
 *
 * Determines whether two values are not equal using strict comparison.
 * This is the logical opposite of equals, providing a more explicit
 * and readable way to check for inequality than using negation.
 * Returns false for equal values and true for unequal values.
 *
 * @param a - The first value to compare
 * @returns A function that takes the second value and returns true if unequal
 * @example
 * ```typescript
 * // Basic usage
 * isUnequal(5)(3)          // true
 * isUnequal(5)(5)          // false
 * isUnequal("a")("b")      // true
 * isUnequal("a")("a")      // false
 *
 * // With arrays and objects (reference equality)
 * isUnequal([1, 2])([1, 2])    // true (different references)
 * const arr = [1, 2]
 * isUnequal(arr)(arr)          // false (same reference)
 *
 * // Filtering unequal values
 * const numbers = [1, 2, 2, 3, 2, 4]
 * const notTwo = numbers.filter(isUnequal(2))  // [1, 3, 4]
 *
 * // Validation
 * const validateNotEmpty = (str: string) =>
 *   isUnequal("")(str) ? valid(str) : invalid("String cannot be empty")
 * ```
 * @pure
 * @predicate
 */
import not from "../../logic/not/index.ts"
import isEqual from "../isEqual/index.ts"

export default function isUnequal<T>(a: T): (b: unknown) => boolean {
	return function isUnequalInner(b: unknown): boolean {
		return not(isEqual(a)(b))
	}
}
