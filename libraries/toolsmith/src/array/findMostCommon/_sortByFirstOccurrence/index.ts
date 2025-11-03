import defaultTo from "../../../logic/defaultTo/index.ts"
import subtract from "../../../math/subtract/index.ts"

//++ Sorts items by first occurrence (private, not curried for use in sort)
export default function _sortByFirstOccurrence<T>(
	firstOccurrence: Map<T, number>,
) {
	return function sortByOccurrence(a: T, b: T): number {
		// deno-coverage-ignore - defensive fallback, logically unreachable
		const indexA = defaultTo(0)(firstOccurrence.get(a))
		// deno-coverage-ignore - defensive fallback, logically unreachable
		const indexB = defaultTo(0)(firstOccurrence.get(b))
		return subtract(indexB)(indexA) as number
	}
}
