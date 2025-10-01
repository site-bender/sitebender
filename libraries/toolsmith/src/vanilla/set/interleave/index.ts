//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const interleave = <T>(...sets: Array<Set<T>>): Array<T> => {
	if (sets.length === 0) return []

	const iterators = sets.map((set) => set.values())
	const result: Array<T> = []
	let hasMore = true

	while (hasMore) {
		hasMore = false
		for (const iterator of iterators) {
			const next = iterator.next()
			if (!next.done) {
				result.push(next.value)
				hasMore = true
			}
		}
	}

	return result
}

export default interleave
