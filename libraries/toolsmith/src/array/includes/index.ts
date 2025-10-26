/*++
 + Checks if an item is included in an array
 + Returns boolean indicating presence
 + Curried for partial application with fixed array
 */
export default function includes<T>(array: ReadonlyArray<T>) {
	return function includesWithArray(item: T): boolean {
		/*++
		 + [EXCEPTION] .includes is permitted here for performance reasons
		 + This is the ONLY place .includes should be used
		 + Everywhere else, use the `includes` function instead
		 */
		return array.includes(item)
	}
}
