import gte from "../../validation/gte/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import lte from "../../validation/lte/index.ts"
import length from "../length/index.ts"
import _buildCombinations from "./_buildCombinations/index.ts"

//++ Generates all k-element combinations
export default function combinations<T>(k: number) {
	return function combinationsWithK(
		array: ReadonlyArray<T> | null | undefined,
	): Array<Array<T>> {
		if (isEqual(k)(0)) {
			return [[]]
		}

		if (isArray(array) && isInteger(k) && gte(0)(k) && lte(k)(length(array))) {
			if (isEqual(k)(length(array))) {
				return [[...array]]
			}

			return _buildCombinations(array, k, 0) as Array<Array<T>>
		}

		return []
	}
}
