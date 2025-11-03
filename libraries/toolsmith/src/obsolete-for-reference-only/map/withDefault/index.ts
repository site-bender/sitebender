import isNotUndefined from "../../validation/isNotUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function withDefault<K, V>(defaultValue: V) {
	return function withDefaultValue(map: Map<K, V>): Map<K, V> {
		// Create a new Map that extends the original
		const wrappedMap = new Map(map)

		// Store the original get method
		const originalGet = wrappedMap.get.bind(wrappedMap)

		// Override the get method to return default for missing keys
		wrappedMap.get = function getWithDefault(key: K): V {
			const value = originalGet(key)
			return isNotUndefined(value) ? value : defaultValue
		}

		return wrappedMap
	}
}
