const findLastIndex = (f) => (arr) => {
	const index = arr.findLastIndex(f)

	return index === -1 ? undefined : index
}

export default findLastIndex
