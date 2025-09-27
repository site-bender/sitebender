//++ Tests whether all elements satisfy a predicate
export default function all<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function allWithPredicate(array: Array<T>): boolean {
		return array.every(predicate)
	}
}

//?? [EXAMPLE] `all((n: number) => n > 0)([1, 2, 3]) // true`
//?? [EXAMPLE] `all((n: number) => n > 2)([1, 2, 3]) // false`
//?? [EXAMPLE] `all((n: number) => n > 0)([])        // true (vacuous truth)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Useful for validation
 | const allPositive = all((n: number) => n > 0)
 | allPositive([1, 2, 3]) // true
 | allPositive([1, -2, 3]) // false
 | ```
 */
