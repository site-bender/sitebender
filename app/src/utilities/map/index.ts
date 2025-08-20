const map = <T, U>(mapper: (value: T) => U) => (arr: Array<T>): Array<U> =>
	arr.map(mapper)

export default map
