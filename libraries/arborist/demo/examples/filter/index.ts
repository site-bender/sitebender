// @sitebender/arborist/demo/examples/filter
//++ Curried filter function using functional programming

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Filters an array based on a predicate function
//++ Returns a new array containing only elements that pass the test
export default function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		const result = reduce(
			function reduceItems(accumulator: ReadonlyArray<T>) {
				return function reduceItemsWithAccumulator(item: T): ReadonlyArray<T> {
					return predicate(item) ? [...accumulator, item] : accumulator
				}
			},
		)([] as ReadonlyArray<T>)(array)

		return getOrElse([] as ReadonlyArray<T>)(result)
	}
}
