//++ Extracts a portion of an array
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: Array<T>,
): Array<T> => array.slice(start, end)

export default slice

//?? [EXAMPLE] `slice(1)(3)([1, 2, 3, 4, 5]) // [2, 3]`
//?? [EXAMPLE] `slice(2)(undefined)([1, 2, 3, 4, 5]) // [3, 4, 5]`
//?? [EXAMPLE] `slice(-2)(undefined)([1, 2, 3, 4, 5]) // [4, 5]`
//?? [EXAMPLE] `slice(1)(-1)([1, 2, 3, 4, 5]) // [2, 3, 4]`
//?? [EXAMPLE] `slice(0)(2)([]) // []`
//?? [EXAMPLE] `slice(10)(20)([1, 2, 3]) // []`
