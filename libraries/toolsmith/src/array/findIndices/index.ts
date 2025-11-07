import isArray from "../../predicates/isArray/index.ts"
import concatTo from "../concatTo/index.ts"
import reduce from "../reduce/index.ts"

//++ Finds all indices of matching elements
export default function findIndices<T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function findIndicesWithPredicate(
		array: ReadonlyArray<T> | null | undefined,
	): Array<number> {
		if (isArray(array)) {
			return reduce<T, Array<number>>(
				function collectIndices(
					indices: Array<number>,
					value: T,
					index: number,
				): Array<number> {
					if (predicate(value, index, array as ReadonlyArray<T>)) {
						return concatTo([index])(indices)
					}

					return indices
				},
			)([])(array as ReadonlyArray<T>)
		}

		return []
	}
}
