import isEmpty from "../../array/isEmpty/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Selects a random element from an Array or Set
export default function randomChoice<T>(
	collection: Array<T> | Set<T> | null | undefined,
): T | undefined {
	if (isNullish(collection)) {
		return undefined
	}

	//++ [EXCEPTION] Array.isArray permitted in Toolsmith for performance - provides array type checking wrapper
	if (Array.isArray(collection)) {
		if (isEmpty(collection)) {
			return undefined
		}
		//++ [EXCEPTION] Math.floor, Math.random(), *, .length, [] operator permitted in Toolsmith for performance - provides random index wrapper
		const index = Math.floor(Math.random() * collection.length)
		return collection[index]
	}

	//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides Set type checking wrapper
	if (collection instanceof Set) {
		//++ [EXCEPTION] .size property, === operator permitted in Toolsmith for performance - provides size checking wrapper
		if (collection.size === 0) {
			return undefined
		}
		//++ [EXCEPTION] Array.from permitted in Toolsmith for performance - provides Set to array conversion wrapper
		const items = Array.from(collection)
		//++ [EXCEPTION] Math.floor, Math.random(), *, .length, [] operator permitted in Toolsmith for performance - provides random index wrapper
		const index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	return undefined
}
