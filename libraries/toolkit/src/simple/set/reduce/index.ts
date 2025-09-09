import isNullish from "../../validation/isNullish/index.ts"

/**
 * Reduce a Set to a single value using an accumulator function
 *
 * @pure
 * @curried
 * @immutable Does not modify the input Set
 * @safe Returns the initial value for null/undefined inputs
 */
const reduce = <T, U>(fn: (accumulator: U, value: T) => U) =>
(initial: U) =>
(
	set: Set<T> | null | undefined,
): U => {
	if (isNullish(set) || !(set instanceof Set)) return initial
	return Array.from(set).reduce<U>(fn, initial)
}

export default reduce
