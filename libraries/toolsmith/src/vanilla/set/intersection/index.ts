import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const intersection = <T>(
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

	// Use native Set.intersection if available (ES2025)
	if (
		"intersection" in Set.prototype &&
		typeof set1.intersection === "function"
	) {
		return set1.intersection(set2)
	}

	// Fallback: Iterate over smaller set for efficiency
	const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]
	return new Set(Array.from(smaller).filter((element) => larger.has(element)))
}

export default intersection
