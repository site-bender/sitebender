import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const has =
	(pathInput: string | Array<string | number>) => (obj: Value): boolean => {
		// Handle null/undefined object
		if (isNullish(obj)) return false

		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path means check if object exists
		if (keys.length === 0) return true

		// Traverse the path using recursion
		const checkPath = (
			current: Value,
			remainingKeys: Array<string | number>,
		): boolean => {
			if (remainingKeys.length === 0) return true

			// Check if we can continue traversing
			if (isNullish(current) || typeof current !== "object") {
				return false
			}

			const [key, ...rest] = remainingKeys

			// Check for property existence
			if (Array.isArray(current)) {
				// For arrays, check numeric indices
				const index = typeof key === "number"
					? key
					: parseInt(key as string, 10)
				if (isNaN(index) || index < 0 || index >= current.length) {
					return false
				}
				return checkPath(current[index], rest)
			} else if (current instanceof Map || current instanceof Set) {
				// Maps and Sets don't support dot notation traversal
				return false
			} else {
				// For plain objects, check own properties only
				const strKey = String(key)
				if (!Object.prototype.hasOwnProperty.call(current, strKey)) {
					return false
				}
				return checkPath(
					(current as Record<string, Value>)[strKey],
					rest,
				)
			}
		}

		return checkPath(obj, keys)
	}

export default has
