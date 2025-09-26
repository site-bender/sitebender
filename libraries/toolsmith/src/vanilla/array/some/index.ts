/*++
 | Tests whether at least one element in an array passes a test function
 |
 | Returns true if any element satisfies the predicate, false otherwise.
 | Short-circuits on first match. Empty arrays always return false.
 */
const some = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): boolean => array.some(predicate)

export default some

//?? [EXAMPLE] `some((n: number) => n > 2)([1, 2, 3]) // true`
//?? [EXAMPLE] `some((n: number) => n < 0)([1, 2, 3]) // false`
//?? [EXAMPLE] `some((n: number) => n < 0)([1, -2, 3]) // true`
//?? [EXAMPLE] `some(() => true)([]) // false`
//?? [EXAMPLE] `some(() => false)([1, 2, 3]) // false`
//?? [EXAMPLE] `some((x: number) => x % 2 === 0)([1, 3, 5, 7]) // false`
