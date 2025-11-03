/*++
 + Tests if no elements in an array satisfy a predicate function
 + Returns true when no elements match (opposite of some)
 + [EXCEPTION] This is a predicate that returns boolean
 */
export default function none<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	function noneWithPredicate(array: ReadonlyArray<T>): boolean {
		/*++
		 + [EXCEPTION] .some() permitted in Toolsmith for predicates
		 */
		return !array.some(predicate)
	}

	return noneWithPredicate
}
