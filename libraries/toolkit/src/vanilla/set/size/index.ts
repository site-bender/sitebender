/**
 * Return the number of elements in a Set
 *
 * @pure
 * @safe Returns 0 for null/undefined inputs
 */
const size = <T>(set: Set<T> | null | undefined): number =>
	set instanceof Set ? set.size : 0

export default size
