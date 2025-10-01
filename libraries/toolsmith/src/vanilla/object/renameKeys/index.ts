import type { Value } from "../../../types/index.ts"

import isNotUndefined from "../../validation/isNotUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const renameKeys = <T extends Record<string | symbol, Value>>(
	keyMap: Record<string | symbol, string | symbol>,
) =>
(
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Process each key and rename if needed
	return Object.entries(obj).reduce((acc, [oldKey, value]) => {
		const newKey = isNotUndefined(keyMap[oldKey]) ? keyMap[oldKey] : oldKey
		return { ...acc, [newKey]: value }
	}, {} as Record<string | symbol, Value>)
}

export default renameKeys
