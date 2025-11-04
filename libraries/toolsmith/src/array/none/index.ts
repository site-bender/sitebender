import not from "../../logic/not/index.ts"

/*++
 + Tests if no elements in an array satisfy a predicate function
 + Returns true when no elements match (opposite of some)
 + [EXCEPTION] This is a predicate that returns boolean
 + [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
 */
export default function none<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function noneWithPredicate(array: ReadonlyArray<T>): boolean {
		return not(array.some(predicate))
	}
}
