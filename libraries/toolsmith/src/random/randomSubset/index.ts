import isNullish from "../../predicates/isNullish/index.ts"
import randomInteger from "../randomInteger/index.ts"

//++ Selects a random subset from an Array or Set
export default function randomSubset<T>(
	collection: Array<T> | Set<T> | null | undefined,
) {
	return function (
		size: number | null | undefined = undefined,
	): Array<T> | Set<T> | null {
		if (isNullish(collection)) {
			return null
		}

		let items: Array<T>
		let collectionSize: number

		//++ [EXCEPTION] Array.isArray permitted in Toolsmith for performance - provides array type checking wrapper
		if (Array.isArray(collection)) {
			items = [...collection]
			//++ [EXCEPTION] .length property permitted in Toolsmith for performance - provides length wrapper
			collectionSize = collection.length
			//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides Set type checking wrapper
		} else if (collection instanceof Set) {
			//++ [EXCEPTION] Array.from permitted in Toolsmith for performance - provides Set to array conversion wrapper
			items = Array.from(collection)
			//++ [EXCEPTION] .size property permitted in Toolsmith for performance - provides size wrapper
			collectionSize = collection.size
		} else {
			return null
		}

		//++ [EXCEPTION] === operator, Array.isArray permitted in Toolsmith for performance - provides empty check wrapper
		if (collectionSize === 0) {
			return Array.isArray(collection) ? [] : new Set()
		}

		let subsetSize: number
		if (isNullish(size)) {
			subsetSize = randomInteger(0)(collectionSize)
			//++ [EXCEPTION] typeof, isFinite operators permitted in Toolsmith for performance - provides type checking wrapper
		} else if (typeof size !== "number" || !isFinite(size)) {
			return null
			//++ [EXCEPTION] < operator permitted in Toolsmith for performance - provides comparison wrapper
		} else if (size < 0) {
			subsetSize = 0
		} else {
			//++ [EXCEPTION] Math.min, Math.floor permitted in Toolsmith for performance - provides size clamping wrapper
			subsetSize = Math.min(Math.floor(size), collectionSize)
		}

		//++ [EXCEPTION] .reduce(), >=, +, Math.floor, Math.random(), *, -, [] operators permitted in Toolsmith for performance - provides Fisher-Yates shuffle wrapper
		const shuffled = items.reduce((acc, _, idx) => {
			if (idx >= subsetSize) return acc
			const j = idx + Math.floor(Math.random() * (collectionSize - idx))
			const result = [...acc]
			const temp = result[idx]
			result[idx] = result[j]
			result[j] = temp
			return result
		}, items)

		//++ [EXCEPTION] .slice() permitted in Toolsmith for performance - provides array slicing wrapper
		const subset = shuffled.slice(0, subsetSize)

		//++ [EXCEPTION] Array.isArray permitted in Toolsmith for performance - provides array type checking wrapper
		if (Array.isArray(collection)) {
			return subset
		} else {
			return new Set(subset)
		}
	}
}
