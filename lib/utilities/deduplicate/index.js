import stringify from "../stringify"

const deduplicate = arr => {
	const filtered = arr.reduce((acc, obj) => {
		const key = stringify(obj)

		return {
			...acc,
			[key]: obj,
		}
	}, {})

	return Object.values(filtered)
}

export default deduplicate
