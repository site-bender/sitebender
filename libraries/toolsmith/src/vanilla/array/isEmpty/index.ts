//++ Checks if an array is empty
export default function isEmpty<T>(array: ReadonlyArray<T>): boolean {
	return Array.isArray(array) && array.length === 0
}
