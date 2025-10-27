/*++
 + Checks if an item is included in an array
 + Returns boolean indicating presence with type guard
 + Curried for partial application with fixed array
 + Acts as type guard: if true, narrows item type to array element type
 */
export default function includes<T>(array: ReadonlyArray<T>) {
	return function includesWithArray(item: unknown): item is T {
		/*++
		 + [EXCEPTION] .includes is permitted here for performance reasons
		 + This is the ONLY place .includes should be used
		 + Everywhere else, use the `includes` function instead
		 + [EXCEPTION] Type assertion needed to call native .includes with unknown
		 */
		return array.includes(item as T)
	}
}
