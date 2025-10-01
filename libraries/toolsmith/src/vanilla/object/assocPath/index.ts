import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const assocPath = <V extends Value>(
	path: Array<string | number>,
) =>
(
	value: V,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path returns the value itself
	if (path.length === 0) {
		return value
	}

	// Handle null/undefined input
	const source = (!obj || typeof obj !== "object") ? {} : obj

	// Single element path - vanilla property set
	if (path.length === 1) {
		return {
			...source,
			[path[0]]: value,
		}
	}

	// Multi-element path - recursive structure building
	const [head, ...tail] = path
	const currentValue = source[head as keyof typeof source]

	// Recursively build the nested structure
	const nestedValue = assocPath(tail)(value)(
		currentValue && typeof currentValue === "object"
			? currentValue as Record<string | symbol, Value>
			: {},
	)

	return {
		...source,
		[head]: nestedValue,
	}
}

export default assocPath
