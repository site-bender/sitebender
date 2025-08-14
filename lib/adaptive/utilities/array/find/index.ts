/**
 * Finds the first element in an array that matches a predicate
 * 
 * @param predicate - Function that returns true for the desired element
 * @param array - The array to search
 * @returns The first matching element or undefined
 * @example
 * ```typescript
 * find((n: number) => n > 2)([1, 2, 3, 4]) // 3
 * find((s: string) => s.startsWith("h"))(["apple", "hello"]) // "hello"
 * ```
 */
export default function find<T>(predicate: (item: T) => boolean) {
	return (array: Array<T>): T | undefined => array.find(predicate)
}
