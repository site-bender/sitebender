import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSubsetOf = <T>(
	superset: Set<T> | null | undefined,
) =>
(
	subset: Set<T> | null | undefined,
): boolean => {
	// Empty set is subset of any set
	if (isNullish(subset) || !(subset instanceof Set) || subset.size === 0) {
		return true
	}

	// Non-empty set cannot be subset of empty/null set
	if (isNullish(superset) || !(superset instanceof Set)) {
		return false
	}

	// Optimization: subset cannot be larger than superset
	if (subset.size > superset.size) {
		return false
	}

	// Use native Set.isSubsetOf if available (ES2025)
	if (
		"isSubsetOf" in Set.prototype && typeof subset.isSubsetOf === "function"
	) {
		return subset.isSubsetOf(superset)
	}

	// Fallback: Check if every element in subset exists in superset
	return Array.from(subset).every((element) => superset.has(element))
}

export default isSubsetOf
