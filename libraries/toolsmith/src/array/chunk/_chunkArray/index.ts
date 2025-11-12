/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper: chunks array into fixed-size subarrays using functional recursion.
 */

import and from "../../../logic/and/index.ts"
import isInteger from "../../../predicates/isInteger/index.ts"
import isEmpty from "../../isEmpty/index.ts"
import slice from "../../slice/index.ts"

export default function _chunkArray<T>(size: number) {
	return function _chunkArrayWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ Validate size: must be positive integer
		//++ [EXCEPTION] Using raw operator > for performance in Toolsmith
		if (and(isInteger(size))(size > 0)) {
			return chunkRecursive<T>(size)(array)
		}

		return []
	}
}

function chunkRecursive<T>(size: number) {
	return function chunkRecursiveWithSize(
		remaining: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		if (isEmpty(remaining)) {
			return []
		}

		const currentChunk: ReadonlyArray<T> = slice(0)(size)(remaining)
		const rest: ReadonlyArray<T> = slice(size)(undefined)(remaining)

		return [currentChunk, ...chunkRecursive<T>(size)(rest)]
	}
}
