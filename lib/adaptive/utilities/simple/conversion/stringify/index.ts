import type { Value } from "../../types/index.ts"

/**
 * Converts an object or array to a unique string representation
 * Used for creating deterministic string keys from complex objects
 * 
 * @param obj - The value to stringify
 * @returns A deterministic string representation
 * @example
 * ```typescript
 * stringify({ b: 2, a: 1 }) // "a:1;b:2"
 * stringify([1, 2, 3]) // "1;2;3"
 * ```
 */
const stringify = (obj: Value): string => {
	if (obj === null || obj === undefined) {
		return ""
	}

	if (Array.isArray(obj)) {
		return obj.map(stringify).join(";")
	}

	if (typeof obj === "object") {
		return Object.entries(obj)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => `${key}:${stringify(value)}`)
			.join(";")
	}

	return String(obj)
}

export default stringify