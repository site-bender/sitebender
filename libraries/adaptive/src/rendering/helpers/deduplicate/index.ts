const deduplicate = (arr: Array<Value> = []): Array<Value> => {
	const seen = new Set()
	const result: Array<Value> = []

	for (const item of arr) {
		const key = JSON.stringify(item)
		if (!seen.has(key)) {
			seen.add(key)
			result.push(item)
		}
	}

	return result
}

export default deduplicate
