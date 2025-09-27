//++ Finds the first element matching a predicate
export default function find<T>(predicate: (item: T) => boolean) {
	return function findWithPredicate(array: Array<T>): T | undefined {
		/*++
		 | [EXCEPTION] Using native find for performance
		 | No toolsmith alternative exists for finding elements
		 | Native method is well-tested and optimized
		 */
		return array.find(predicate)
	}
}

//?? [EXAMPLE] `find((n: number) => n > 2)([1, 2, 3, 4])              // 3`
//?? [EXAMPLE] `find((s: string) => s.startsWith("h"))(["apple", "hello"]) // "hello"`
//?? [EXAMPLE] `find((n: number) => n > 10)([1, 2, 3])                // undefined`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find first even number
 | const findEven = find((n: number) => n % 2 === 0)
 | findEven([1, 3, 5, 6, 7, 8])                          // 6
 | ```
 */
