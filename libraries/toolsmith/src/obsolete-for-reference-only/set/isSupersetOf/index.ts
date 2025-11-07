import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSupersetOf = <T>(
	subset: Set<T> | null | undefined,
) =>
(
	superset: Set<T> | null | undefined,
): boolean => {
	// Any set is superset of empty set
	if (isNullish(subset) || !(subset instanceof Set) || subset.size === 0) {
		return true
	}

	// Empty/null set cannot be superset of non-empty set
	if (isNullish(superset) || !(superset instanceof Set)) {
		return false
	}

	// Optimization: superset must be at least as large as subset
	if (superset.size < subset.size) {
		return false
	}

	// Use native Set.isSupersetOf if available (ES2025)
	if (
		"isSupersetOf" in Set.prototype &&
		typeof superset.isSupersetOf === "function"
	) {
		return superset.isSupersetOf(subset)
	}

	// Fallback: Check if every element in subset exists in superset
	return Array.from(subset).every((element) => superset.has(element))
}

export default isSupersetOf
