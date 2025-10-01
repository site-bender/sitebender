//++ Creates an array from an async iterable or iterable
export default function fromAsync<T>(
	iterable: AsyncIterable<T> | Iterable<T>,
): Promise<T[]> {
	return Array.fromAsync(iterable)
}
