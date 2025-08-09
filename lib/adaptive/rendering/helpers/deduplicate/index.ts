const deduplicate = (arr: any[] = []): any[] => {
	const seen = new Set()
	const result: any[] = []

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
