import type { Lens } from "../lens/index.ts"

import lens from "../lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lensIndex = <T>(
	index: number,
): Lens<Array<T>, T> => {
	return lens<Array<T>, T>(
		// Getter: safely access array at index
		(arr) => {
			// Handle negative indices
			const actualIndex = index < 0 ? arr.length + index : index

			return arr[actualIndex]
		},
	)(
		// Setter: immutably update array at index
		(value) => (arr) => {
			// Handle negative indices
			const actualIndex = index < 0 ? arr.length + index : index

			// If index is out of bounds, extend array
			if (actualIndex < 0) {
				// Negative index beyond array start - return unchanged
				return arr
			}

			// Create a new array with the updated value
			const result = [...arr]

			// Extend array if necessary (fills with undefined)
			const gap = actualIndex - result.length + 1
			if (gap > 0) {
				const extension = Array.from(
					{ length: gap },
					() => undefined as T,
				)
				extension[extension.length - 1] = value
				return [...result, ...extension]
			}

			result[actualIndex] = value
			return result
		},
	)
}

export default lensIndex
