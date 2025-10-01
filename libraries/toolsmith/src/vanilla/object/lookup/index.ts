import hasOwn from "../hasOwn/index.ts"
import isNotNullish from "../../validation/isNotNullish/index.ts"

//++ Returns the value at the given key in an object, or null if not found
export default function lookup<K extends PropertyKey>(key: K) {
	return function lookupKey<T extends Record<PropertyKey, unknown>>(
		obj: T,
	): unknown | null {
		if (hasOwn(key)(obj)) {
			const value = obj[key as keyof T]

			if (isNotNullish(value)) {
				return value
			}
		}

		return null
	}
}
