import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hasPath = (
	path: Array<string | number | symbol>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Empty path - check if obj itself exists and is an object
	if (path.length === 0) {
		return isNotNullish(obj) && typeof obj === "object"
	}

	// Use recursive function to traverse path
	const checkPath = (
		current: Value,
		remaining: Array<string | number | symbol>,
	): boolean => {
		if (remaining.length === 0) return true

		// Check if current is an object that can have properties
		if (isNullish(current) || typeof current !== "object") {
			return false
		}

		const [key, ...rest] = remaining

		// Check if the key exists as an own property
		if (
			!Object.prototype.hasOwnProperty.call(
				current,
				key as string | symbol,
			)
		) {
			return false
		}

		// Move to the next level
		return checkPath(
			(current as Record<string | symbol, Value>)[key as string | symbol],
			rest,
		)
	}

	return checkPath(obj, path)
}

export default hasPath
