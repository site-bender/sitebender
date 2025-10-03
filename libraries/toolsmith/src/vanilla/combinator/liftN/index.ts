//++ Like lift but with specified arity, lifting a function to work with exactly n wrapped values
const liftN = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
	return (
		...arrays: ReadonlyArray<ReadonlyArray<unknown>>
	): Array<R> => {
		if (n === 0) {
			// Zero arity - return single value in array
			return [fn()]
		}

		if (n === 1) {
			// Unary - just map
			return arrays[0] ? arrays[0].map((x) => fn(x)) : []
		}

		// Take only first n arrays
		const relevantArrays = arrays.slice(0, n)

		// If we don't have enough arrays, return empty
		if (relevantArrays.length < n) {
			return []
		}

		// Compute Cartesian product of n arrays functionally
		const cartesian = relevantArrays.reduce<unknown[][]>(
			(acc, arr) => {
				const current = Array.from(arr) as unknown[]
				return acc.flatMap((combo) =>
					current.map((item) => [...combo, item] as unknown[])
				)
			},
			[[]] as unknown[][],
		)

		// Apply function to each combination
		return cartesian.map((args) => fn(...(args as ReadonlyArray<unknown>)))
	}
}

export default liftN
