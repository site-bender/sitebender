import isArray from "../../validation/isArray/index.ts"

/*++
 | [EXCEPTION] Using native findLast for performance
 | Native method is optimized for backward iteration
 | No toolsmith alternative exists for reverse iteration
 */

//++ Finds the last element matching a predicate
export default function findLast<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function findLastWithPredicate(
		array: Array<T>,
	): T | undefined {
		if (isArray(array)) {
			return array.findLast(predicate)
		}
		return undefined
	}
}

//?? [EXAMPLE] `findLast((n: number) => n > 2)([1, 3, 2, 4])                    // 4`
//?? [EXAMPLE] `findLast((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // "hi"`
//?? [EXAMPLE] `findLast((n: number) => n > 10)([1, 2, 3])                      // undefined`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find most recent error
 | const findLastError = findLast((log: LogEntry) => log.level === "error")
 | findLastError(logs) // Most recent error or undefined
 | ```
 */
