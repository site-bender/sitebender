import isNullish from "../../validation/isNullish/index.ts"

/**
 * Partition a Set by a predicate into [matching, nonMatching]
 *
 * Splits a Set into two Sets based on a predicate function.
 *
 * @immutable
 * @pure
 * @curried
 * @safe Returns [Set{}, Set{}] for null/undefined inputs
 */
const partitionBy = <T>(predicate: (value: T) => boolean) =>
(
	set: Set<T> | null | undefined,
): [Set<T>, Set<T>] => {
	if (isNullish(set) || !(set instanceof Set)) {
		return [new Set<T>(), new Set<T>()]
	}

	// Build two new Sets using a single pass without mutation of input
	return Array.from(set).reduce<[Set<T>, Set<T>]>(
		([yes, no], value) => (
			predicate(value)
				? [new Set([...yes, value]), no]
				: [yes, new Set([...no, value])]
		),
		[new Set<T>(), new Set<T>()],
	)
}

export default partitionBy
