//++ Finds the index of the first matching element
export default function findIndex<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function findIndexWithPredicate(array: Array<T>): number {
		/*++
		 | [EXCEPTION] Using native findIndex for performance
		 | No toolsmith alternative exists for finding index
		 | Native method is well-tested and optimized
		 */
		return array.findIndex(predicate)
	}
}

//?? [EXAMPLE] `findIndex((n: number) => n > 2)([1, 2, 3, 4])                  // 2`
//?? [EXAMPLE] `findIndex((s: string) => s.startsWith("h"))(["apple", "hello"]) // 1`
//?? [EXAMPLE] `findIndex((n: number) => n > 10)([1, 2, 3])                    // -1`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find position of first admin user
 | const findAdminIndex = findIndex((user: User) => user.role === "admin")
 | findAdminIndex(users) // Index or -1
 | ```
 */
