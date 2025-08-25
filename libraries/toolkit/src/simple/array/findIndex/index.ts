/**
 * Finds the index of the first element that satisfies a predicate
 *
 * Returns the zero-based index of the first element for which the predicate
 * returns truthy, or undefined if no element matches. Short-circuits on first match.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to search
 * @returns Index of first matching element or undefined if none found
 * @example
 * ```typescript
 * findIndex((n: number) => n > 2)([1, 2, 3, 4]) // 2
 * findIndex((s: string) => s.startsWith("h"))(["apple", "hello"]) // 1
 * findIndex((n: number) => n > 10)([1, 2, 3]) // undefined
 *
 * // Find position of first admin user
 * const findAdminIndex = findIndex((user: User) => user.role === "admin")
 * findAdminIndex(users) // Index or undefined
 * ```
 */
const findIndex =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T>): number | undefined => {
		const index = array.findIndex(predicate)
		return index === -1 ? undefined : index
	}

export default findIndex
