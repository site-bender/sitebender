import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const intersectionWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set1) || !(set1 instanceof Set) || set1.size === 0) {
		return new Set()
	}

	if (isNullish(set2) || !(set2 instanceof Set) || set2.size === 0) {
		return new Set()
	}

	return new Set(
		Array.from(set1).filter((element1) =>
			Array.from(set2).some((element2) => comparator(element1, element2))
		),
	)
}

export default intersectionWith
