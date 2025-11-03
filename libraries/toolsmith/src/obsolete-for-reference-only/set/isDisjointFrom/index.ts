//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const isDisjointFrom = <T>(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): boolean => {
	// Empty sets are disjoint from everything
	if (isNullish(set1) || !(set1 instanceof Set) || set1.size === 0) {
		return true
	}

	if (isNullish(set2) || !(set2 instanceof Set) || set2.size === 0) {
		return true
	}

	// Use native Set.isDisjointFrom if available (ES2025)
	if (
		"isDisjointFrom" in Set.prototype &&
		typeof set1.isDisjointFrom === "function"
	) {
		return set1.isDisjointFrom(set2)
	}

	// Fallback: Optimize by checking smaller set against larger
	const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]

	// Check if any element in smaller set exists in larger set
	return !Array.from(smaller).some((element) => larger.has(element))
}

export default isDisjointFrom
