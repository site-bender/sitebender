import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const path =
	(pathInput: string | Array<string | number>) => (obj: Value): Value => {
		// Handle null/undefined object
		if (isNullish(obj)) return null

		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path returns the object itself
		if (keys.length === 0) return obj

		// Traverse the path using reduce (pure FP)
		return keys.reduce((acc: Value, key) => {
			if (isNullish(acc)) return null

			if (Array.isArray(acc)) {
				const index = typeof key === "number" ? key : parseInt(String(key), 10)
				const element = !isNaN(index) ? acc[index] : undefined
				return element === undefined ? null : element
			}

			if (acc instanceof Map) {
				const value = acc.get(key as unknown as never)
				return value === undefined ? null : value
			}
			if (acc instanceof Set) return null

			if (typeof acc === "object") {
				const strKey = String(key)
				const value = Object.prototype.hasOwnProperty.call(acc, strKey)
					? (acc as Record<string, Value>)[strKey]
					: undefined
				return value === undefined ? null : value
			}

			return null
		}, obj as Value)
	}

export default path
