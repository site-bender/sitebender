import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const propOr = <D extends Value>(
	defaultValue: D,
) =>
<K extends string | symbol, V>(
	key: K,
) =>
<T extends Record<K, unknown>>(
	obj: T,
): V | D => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return defaultValue
	}

	// Check if property exists (including undefined values)
	if (
		Object.prototype.hasOwnProperty.call(
			obj as object,
			key as string | symbol,
		)
	) {
		return (obj as Record<string | symbol, unknown>)[key] as V
	}

	// Return default for missing properties
	return defaultValue
}

export default propOr
