//++ Filters an array based on a predicate function
//!! This is a critical function for functional programming
//++ Takes a predicate and returns a function that takes an array
export default function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(
		items: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		const result: Array<T> = []
		const length = items.length
		let index = 0

		while (index < length) {
			const item = items[index]

			if (predicate(item)) {
				result.push(item)
			}

			index = index + 1
		}

		return result
	}
}
