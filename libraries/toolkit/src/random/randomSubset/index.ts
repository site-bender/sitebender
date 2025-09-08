import isNullish from "../../simple/validation/isNullish/index.ts"
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

//?? [EXAMPLE] randomSubset([1, 2, 3, 4, 5])(2) // [3, 5]
//?? [EXAMPLE] randomSubset(['a', 'b', 'c', 'd', 'e'])(3) // ['b', 'd', 'e']
//?? [EXAMPLE] randomSubset([1, 2, 3, 4, 5])() // [2, 4] (random size)
//?? [EXAMPLE] randomSubset(new Set(['red', 'green', 'blue', 'yellow']))(2) // Set(['blue', 'yellow'])
/*??
 * [EXAMPLE]
 * const players = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
 * const team = randomSubset(players)(3) // ['Bob', 'Diana', 'Frank']
 *
 * const deck = Array.from({ length: 52 }, (_, i) => i + 1)
 * const drawHand = randomSubset(deck)
 * const hand1 = drawHand(5) // [3, 12, 28, 41, 50]
 * const hand2 = drawHand(5) // [7, 15, 22, 38, 44]
 *
 * [GOTCHA] Size larger than collection returns the entire collection
 * [GOTCHA] Returns null for invalid inputs
 */
