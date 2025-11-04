//++ Extracts a portion of an array
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: ReadonlyArray<T>,
): Array<T> => array.slice(start, end)

export default slice
