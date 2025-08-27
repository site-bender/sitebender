/**
 * Performs strict equality comparison using the === operator
 *
 * Checks if two values are strictly equal without any type coercion. This is
 * a curried function for creating reusable identity checks. Unlike equals which
 * performs deep structural comparison, identical only returns true if the values
 * are the same primitive value or the same object reference.
 *
 * Comparison rules:
 * - Primitives: must be same type and value
 * - Objects/Arrays: must be same reference (not structural equality)
 * - NaN: NaN === NaN returns false (use Number.isNaN or equals for NaN)
 * - +0 and -0: considered identical (both === 0)
 * - No type coercion (unlike == operator)
 *
 * @pure
 * @curried
 * @predicate
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if values are strictly equal (===), false otherwise
 * @example
 * ```typescript
 * // Primitive comparisons
 * identical(5)(5)              // true
 * identical("hello")("hello")  // true
 * identical(5)("5")            // false (different types)
 *
 * // Object reference equality (not structural)
 * const obj1 = { a: 1 }
 * const obj2 = { a: 1 }
 * const obj3 = obj1
 * identical(obj1)(obj2)        // false (different objects)
 * identical(obj1)(obj3)        // true (same reference)
 *
 * // Special values
 * identical(NaN)(NaN)          // false (NaN !== NaN)
 * identical(0)(-0)             // true (both === 0)
 *
 * // Partial application
 * const isNull = identical(null)
 * isNull(null)                // true
 * isNull(undefined)            // false
 * ```
 */
const identical = <T>(a: T) => <U>(b: U): boolean => a === b

export default identical
