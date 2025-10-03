//++ Lifts a function to work with functors/applicatives, transforming it to work with wrapped values (Arrays, Promises, etc.)
const lift = <R>(fn: (...args: ReadonlyArray<unknown>) => R) => {
	return (
		...arrays: ReadonlyArray<ReadonlyArray<unknown>>
	): Array<R> => {
		if (arrays.length === 0) return []
		if (arrays.length === 1) {
			// Unary function - just map
			return arrays[0].map(fn)
		}

		// For n-ary functions, compute Cartesian product functionally
		const cartesianProduct = arrays.reduce<Array<Array<unknown>>>(
			(acc, currentArray) =>
				acc.flatMap((combo) =>
					Array.from(currentArray).map((item) => [...combo, item])
				),
			[[]],
		)

		// Apply function to each combination
		return cartesianProduct.map((args) => fn(...args))
	}
}

export default lift
