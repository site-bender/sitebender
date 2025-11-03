import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const symmetricDifferenceWith = <T>(
	equals: (a: T, b: T) => boolean,
) =>
(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set1) || !(set1 instanceof Set)) {
		if (isNullish(set2) || !(set2 instanceof Set)) {
			return new Set()
		}
		return new Set(set2)
	}

	if (isNullish(set2) || !(set2 instanceof Set)) {
		return new Set(set1)
	}

	// Pure FP: use filter with Array.some for custom equality
	const arr1 = Array.from(set1)
	const arr2 = Array.from(set2)

	const onlyInSet1 = arr1.filter(
		(elem1) => !arr2.some((elem2) => equals(elem1, elem2)),
	)
	const onlyInSet2 = arr2.filter(
		(elem2) => !arr1.some((elem1) => equals(elem2, elem1)),
	)

	return new Set([...onlyInSet1, ...onlyInSet2])
}

export default symmetricDifferenceWith
