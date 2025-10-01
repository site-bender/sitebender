import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mapValues = <T extends Value, R extends Value>(
	fn: (value: T) => R,
) =>
<K extends string | symbol>(
	obj: Record<K, T> | null | undefined,
): Record<K, R> => {
	if (isNullish(obj) || typeof obj !== "object") {
		return {} as Record<K, R>
	}

	// Get all keys (both string and symbol)
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Use reduce to build the result object
	return allKeys.reduce((acc, key) => ({
		...acc,
		[key]: fn((obj as Record<string | symbol, T>)[key]),
	}), {} as Record<K, R>)
}

export default mapValues
