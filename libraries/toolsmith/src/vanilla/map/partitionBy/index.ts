//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const partitionBy = <K, V>(
	predicate: (value: V, key: K) => unknown,
) =>
(map: Map<K, V>): Array<Map<K, V>> => {
	const entries = Array.from(map.entries())
	if (entries.length === 0) return []

	// Group consecutive entries with same predicate result
	const groups = entries.reduce<Array<Array<[K, V]>>>((acc, entry, index) => {
		const [key, value] = entry
		const predicateResult = predicate(value, key)

		if (index === 0) {
			return [[entry]]
		}

		const [prevKey, prevValue] = entries[index - 1]
		const prevPredicateResult = predicate(prevValue, prevKey)

		if (predicateResult === prevPredicateResult) {
			// Add to last group immutably
			return [
				...acc.slice(0, -1),
				[...acc[acc.length - 1], entry],
			]
		} else {
			// Start new group
			return [...acc, [entry]]
		}
	}, [])

	return groups.map((group) => new Map(group))
}

export default partitionBy
