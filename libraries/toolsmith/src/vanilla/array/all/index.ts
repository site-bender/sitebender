/*++
Tests whether all elements in an array satisfy a predicate function

Returns true if predicate returns truthy for every element, or true for empty array.
Short-circuits on first falsy result.
*/
const all =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T>): boolean => array.every(predicate)

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

export default all
