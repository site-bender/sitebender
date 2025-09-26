/*++
 | Finds the index of the first element that satisfies a predicate
 |
 | Returns the zero-based index of the first element for which the predicate
 | returns truthy, or undefined if no element matches. Short-circuits on first match.
 */
const findIndex =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T>): number | undefined => {
		const index = array.findIndex(predicate)
		return index === -1 ? undefined : index
	}

//?? [EXAMPLE] `findIndex((n: number) => n > 2)([1, 2, 3, 4])                  // 2`
//?? [EXAMPLE] `findIndex((s: string) => s.startsWith("h"))(["apple", "hello"]) // 1`
//?? [EXAMPLE] `findIndex((n: number) => n > 10)([1, 2, 3])                    // undefined`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find position of first admin user
 | const findAdminIndex = findIndex((user: User) => user.role === "admin")
 | findAdminIndex(users) // Index or undefined
 | ```
 */

export default findIndex
