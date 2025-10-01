import type { Value } from "../../../types/index.ts"

import dissoc from "../dissoc/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const dissocPath = (
	path: Array<string | number>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path returns object as-is
	if (path.length === 0) {
		return obj
	}

	// Handle null/undefined input
	if (!obj || typeof obj !== "object") {
		return obj
	}

	// Single element path - use dissoc directly
	if (path.length === 1) {
		return dissoc(path[0] as string | symbol)(obj)
	}

	// Multi-element path - recursive removal
	const [head, ...tail] = path
	const currentValue = obj[head as keyof typeof obj]

	// If the head doesn't exist, return object unchanged
	if (!(head in obj)) {
		return obj
	}

	// If current value is not an object, can't continue path
	if (!currentValue || typeof currentValue !== "object") {
		return obj
	}

	// Recursively remove from nested structure
	const updatedNested = dissocPath(tail)(
		currentValue as Record<string | symbol, Value>,
	)

	// If the nested removal resulted in an empty object and this was the last property,
	// we still include it (as an empty object) to maintain structure
	return {
		...obj,
		[head]: updatedNested,
	}
}

export default dissocPath
