/*++
 + Tests if any element in an array satisfies a predicate function
 + [EXCEPTION] This is a predicate that returns boolean
 */
export default function some<T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	function someWithPredicate(array: ReadonlyArray<T>): boolean {
		/*++
		 + [EXCEPTION] .some() permitted in Toolsmith for predicates
		 */
		return array.some(predicate)
	}

	return someWithPredicate
}
