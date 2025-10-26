/*++
 + Checks if an item is included in a set
 + Returns boolean indicating presence
 + Curried for partial application with fixed set
 */
export default function includes<T>(set: ReadonlySet<T>) {
	return function includesWithSet(item: T): boolean {
		return set.has(item)
	}
}
