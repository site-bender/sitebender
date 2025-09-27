//++ Finds the index of the last matching element
const findLastIndex = <T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(array: ReadonlyArray<T>): number | undefined => {
	const index = array.findLastIndex(predicate)
	return index === -1 ? undefined : index
}

//?? [EXAMPLE] `findLastIndex((n: number) => n > 2)([1, 3, 2, 4])                    // 3`
//?? [EXAMPLE] `findLastIndex((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // 1`
//?? [EXAMPLE] `findLastIndex((n: number) => n > 10)([1, 2, 3])                     // undefined`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find position of most recent error
 | const findLastErrorIndex = findLastIndex((log: LogEntry) => log.level === "error")
 | findLastErrorIndex(logs) // Index or undefined
 | ```
 */

export default findLastIndex
