import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const differenceWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
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

	// Build result with elements not matching any in subtrahend
	return new Set(
		Array.from(minuend).filter(
			(element) =>
				!Array.from(subtrahend).some((excludeElement) =>
					comparator(element, excludeElement)
				),
		),
	)
}

export default differenceWith
