import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const merge = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) =>
(target: T | null | undefined): T & Record<string | symbol, Value> => {
	// Combine all sources and target into one array
	const allObjects = [...sources, target].filter((obj) =>
		isNotNullish(obj) && typeof obj === "object"
	)

	// Use reduce to merge all objects
	return allObjects.reduce((acc, obj) => {
		// Get all keys (both string and symbol)
		const allKeys = [
			...Object.keys(obj),
			...Object.getOwnPropertySymbols(obj),
		]

		// Merge keys into accumulator
		return allKeys.reduce((innerAcc, key) => ({
			...innerAcc,
			[key]: (obj as Record<string | symbol, Value>)[key],
		}), acc)
	}, {} as Record<string | symbol, Value>) as
		& T
		& Record<string | symbol, Value>
}

export default merge
