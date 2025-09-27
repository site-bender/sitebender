//++ Filters elements that satisfy a predicate
export default function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(array: Array<T>): Array<T> {
		/*++
		 | [EXCEPTION] Using native filter for performance
		 | No toolsmith alternative exists for filtering
		 | Native method is well-tested and optimized
		 */
		return array.filter(predicate)
	}
}

//?? [EXAMPLE] `filter((n: number) => n > 2)([1, 2, 3, 4])           // [3, 4]`
//?? [EXAMPLE] `filter((s: string) => s.length > 3)(["hi", "hello"]) // ["hello"]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Compose filters
 | const keepPositive = filter((n: number) => n > 0)
 | const keepEven = filter((n: number) => n % 2 === 0)
 | keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4]))      // [2, 4]
 | ```
 */
