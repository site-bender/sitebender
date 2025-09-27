//++ Finds the last element matching a predicate
const findLast = <T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): T | undefined => array.findLast(predicate)

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

export default findLast
