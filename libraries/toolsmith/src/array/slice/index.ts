//++ Extracts a portion of an array
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: Array<T>,
): Array<T> => array.slice(start, end)

export default slice
