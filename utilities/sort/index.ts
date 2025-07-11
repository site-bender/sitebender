const sort =
	<T>(comparator: (a: T, b: T) => number) => (arr: Array<T>): Array<T> =>
		[...arr].sort(comparator)

export default sort
