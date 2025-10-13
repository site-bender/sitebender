import isEmpty from "../../array/isEmpty/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Selects a random element from an Array or Set
export default function randomChoice<T>(
	collection: Array<T> | Set<T> | null | undefined,
): T | undefined {
	if (isNullish(collection)) {
		return undefined
	}

	if (Array.isArray(collection)) {
		if (isEmpty(collection)) {
			return undefined
		}
		const index = Math.floor(Math.random() * collection.length)
		return collection[index]
	}

	if (collection instanceof Set) {
		if (collection.size === 0) {
			return undefined
		}
		const items = Array.from(collection)
		const index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	return undefined
}
