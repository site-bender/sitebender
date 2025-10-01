import isNullish from "../../vanilla/validation/isNullish/index.ts"
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

		if (Array.isArray(collection)) {
			items = [...collection]
			collectionSize = collection.length
		} else if (collection instanceof Set) {
			items = Array.from(collection)
			collectionSize = collection.size
		} else {
			return null
		}

		if (collectionSize === 0) {
			return Array.isArray(collection) ? [] : new Set()
		}

		let subsetSize: number
		if (isNullish(size)) {
			subsetSize = randomInteger(0)(collectionSize)
		} else if (typeof size !== "number" || !isFinite(size)) {
			return null
		} else if (size < 0) {
			subsetSize = 0
		} else {
			subsetSize = Math.min(Math.floor(size), collectionSize)
		}

		const shuffled = items.reduce((acc, _, idx) => {
			if (idx >= subsetSize) return acc
			const j = idx + Math.floor(Math.random() * (collectionSize - idx))
			const result = [...acc]
			const temp = result[idx]
			result[idx] = result[j]
			result[j] = temp
			return result
		}, items)

		const subset = shuffled.slice(0, subsetSize)

		if (Array.isArray(collection)) {
			return subset
		} else {
			return new Set(subset)
		}
	}
}
