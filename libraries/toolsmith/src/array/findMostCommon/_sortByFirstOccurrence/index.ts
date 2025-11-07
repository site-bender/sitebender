//++ Sorts items by first occurrence (private, not curried for use in sort)
export default function _sortByFirstOccurrence<T>(
	firstOccurrence: Map<T, number>,
) {
	return function sortByOccurrence(a: T, b: T): number {
		//++ [EXCEPTION] Using native nullish coalescing for significant performance benefit in Toolsmith internals
		// deno-coverage-ignore - defensive fallback, logically unreachable
		const indexA = firstOccurrence.get(a) ?? 0
		// deno-coverage-ignore - defensive fallback, logically unreachable
		const indexB = firstOccurrence.get(b) ?? 0
		//++ [EXCEPTION] Using native subtraction for significant performance benefit in Toolsmith internals
		return indexA - indexB
	}
}
