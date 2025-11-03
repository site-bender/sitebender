import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"
import isPlainObject from "../../validation/isPlainObject/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function mergeDeep<T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) {
	return function mergeWithTarget(
		target: T | null | undefined,
	): T & Record<string | symbol, Value> {
		function deepMergeTwo(
			dst: Record<string | symbol, Value>,
			src: Record<string | symbol, Value> | null | undefined,
		): Record<string | symbol, Value> {
			if (!src || typeof src !== "object") return dst

			// Get all keys (both string and symbol)
			const allKeys = [
				...Object.keys(src as Record<string, unknown>),
				...Object.getOwnPropertySymbols(src as object),
			]

			// Use reduce to build merged object
			return allKeys.reduce(function mergeKey(acc, key) {
				const srcValue = (src as Record<string | symbol, Value>)[key]
				const dstValue = (acc as Record<string | symbol, Value>)[key]

				// If both values are objects (but not arrays), merge them recursively
				if (isPlainObject(srcValue) && isPlainObject(dstValue)) {
					return {
						...acc,
						[key]: deepMergeTwo(dstValue, srcValue),
					}
				}

				// Otherwise, source value replaces destination value
				return {
					...acc,
					[key]: srcValue,
				}
			}, { ...dst })
		}

		// Merge all sources and target using reduce
		const allToMerge = [...sources, target].filter(function isValidObject(
			x,
		): x is Record<string | symbol, Value> {
			return isNotNullish(x) && typeof x === "object"
		})

		return allToMerge.reduce(
			function mergeObjects(acc, current) {
				return deepMergeTwo(acc, current)
			},
			{} as Record<string | symbol, Value>,
		) as T & Record<string | symbol, Value>
	}
}
