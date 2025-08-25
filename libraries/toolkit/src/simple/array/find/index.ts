/**
 * Finds the first element in an array that satisfies a predicate
 *
 * Returns the first element for which the predicate returns truthy,
 * or undefined if no element matches. Short-circuits on first match.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function that returns truthy for the desired element
 * @param array - The array to search
 * @returns The first matching element or undefined if none found
 * @example
 * ```typescript
 * find((n: number) => n > 2)([1, 2, 3, 4]) // 3
 * find((s: string) => s.startsWith("h"))(["apple", "hello"]) // "hello"
 * find((n: number) => n > 10)([1, 2, 3]) // undefined
 *
 * // Find first user with specific criteria
 * const findAdmin = find((user: User) => user.role === "admin")
 * findAdmin(users) // First admin user or undefined
 * ```
 */
const find =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): T | undefined =>
		array.find(predicate)

export default find
