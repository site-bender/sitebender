import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const difference = <T>(
	subtrahend: Set<T> | null | undefined,
) =>
(
	minuend: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(minuend) || !(minuend instanceof Set)) {
		return new Set()
	}

	if (
		isNullish(subtrahend) || !(subtrahend instanceof Set) ||
		subtrahend.size === 0
	) {
		return new Set(minuend)
	}

	// Use native Set.difference if available (ES2025)
	if (
		"difference" in Set.prototype &&
		typeof minuend.difference === "function"
	) {
		return minuend.difference(subtrahend)
	}

	// Fallback: Create new Set with elements not in subtrahend
	return new Set(
		Array.from(minuend).filter((element) => !subtrahend.has(element)),
	)
}

export default difference
