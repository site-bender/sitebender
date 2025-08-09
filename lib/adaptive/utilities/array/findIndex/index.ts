const findIndex = (f) => (arr) => {
	const index = arr.findIndex(f)

	return index === -1 ? undefined : index
}

export default findIndex
