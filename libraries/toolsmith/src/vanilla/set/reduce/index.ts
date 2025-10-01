import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const reduce = <T, U>(fn: (accumulator: U, value: T) => U) =>
(initial: U) =>
(
	set: Set<T> | null | undefined,
): U => {
	if (isNullish(set) || !(set instanceof Set)) return initial
	return Array.from(set).reduce<U>(fn, initial)
}

export default reduce
