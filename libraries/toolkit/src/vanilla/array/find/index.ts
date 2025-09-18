//++ Find the first element matching a predicate; returns undefined when no match is found
//?? find((n: number) => n > 2)([1, 2, 3, 4]) // 3
//?? find((s: string) => s.startsWith("h"))(["apple", "hello"]) // "hello"
//?? find((n: number) => n > 10)([1, 2, 3]) // undefined
const find =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): T | undefined =>
		array.find(predicate)

export default find
