/**
 * Returns the logical complement of a predicate function
 * Creates a function that returns the opposite boolean result
 *
 * @param predicate - Predicate function to negate
 * @returns Function that returns the opposite of the predicate
 * @example
 * ```typescript
 * const isEven = (n: number) => n % 2 === 0
 * const isOdd = complement(isEven)
 *
 * isEven(4) // true
 * isOdd(4) // false
 * isOdd(5) // true
 *
 * // Use with array methods
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.filter(isEven) // [2, 4]
 * numbers.filter(isOdd) // [1, 3, 5]
 *
 * // Complement complex predicates
 * const isValidEmail = (email: string) =>
 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 * const isInvalidEmail = complement(isValidEmail)
 *
 * const emails = ["test@example.com", "invalid.email", "user@domain.org"]
 * emails.filter(isValidEmail) // ["test@example.com", "user@domain.org"]
 * emails.filter(isInvalidEmail) // ["invalid.email"]
 *
 * // Useful for partition operations
 * const isPositive = (n: number) => n > 0
 * const isNotPositive = complement(isPositive)
 *
 * const partition = <T>(pred: (x: T) => boolean, arr: Array<T>) => [
 *   arr.filter(pred),
 *   arr.filter(complement(pred))
 * ]
 *
 * partition(isPositive, [-2, -1, 0, 1, 2])
 * // [[1, 2], [-2, -1, 0]]
 *
 * // Chain with other functions
 * const isEmpty = (s: string) => s.length === 0
 * const isNotEmpty = complement(isEmpty)
 * const hasContent = pipe([
 *   (s: string) => s.trim(),
 *   isNotEmpty
 * ])
 *
 * hasContent("  ") // false
 * hasContent(" hello ") // true
 * ```
 *
 * Note: This is equivalent to composing with the not function,
 * but more efficient and semantic for predicates.
 */
const complement = <T extends ReadonlyArray<unknown>>(
	predicate: (...args: T) => boolean,
) =>
(...args: T): boolean => !predicate(...args)

export default complement
